import { Application } from "express";
import ioserver, { Socket } from "socket.io";

import IEventHandlerBase from "./Interfaces/IEventHandlerBase.interface";
import iRepeatJobBase from "./Interfaces/IRepeatJobBase.interface";
const express = require("express");
class App {
  public app: Application;
  public port: number;
  public websocket: any;
  public server: any;
  public io: any;
  public eventHandlers: Array<any>;
  public jobHandler: Array<any>;
  constructor(appInit: {
    port: number;
    middleware: any;
    controller: any;
    websocketHandler: any;
    jobHandler: any;
  }) {
    this.app = express();
    this.port = appInit.port;
    this.server = require("http").Server(this.app);
    this.jobHandler = appInit.jobHandler;
    if (appInit.websocketHandler) {
      this.io = ioserver(this.server);
      this.eventHandlers = appInit.websocketHandler;
      this.io.on("connection", this.onConnectionHandler);
    }

    this.routes(appInit.controller);
    this.registerIntervalJobs(this.jobHandler);
  }
  private onConnectionHandler = (clientSocket: Socket) => {
    this.socketEventRegister(this.eventHandlers, clientSocket);
    // clientSocket.emit("aaa", "this is from server");
  };
  private registerIntervalJobs = (jobs: {
    forEach: (arg0: (job: any) => void) => void;
  }) => {
    jobs.forEach((job: iRepeatJobBase) => {
      job.run(false);
    });
  };
  private middlewares = (middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) => {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  };

  private routes = (controllers: {
    forEach: (
      arg: (controller: any, index: number, entireArray: any) => number
    ) => void;
  }) => {
    controllers.forEach((controller, index, entireArray) => {
      this.app.use("/", controller.router);
      return 1;
    });
  };

  private socketEventRegister = (
    eventsHooks: {
      forEach: (
        arg: (
          eventHandler: IEventHandlerBase,
          index: number,
          allHandler: Array<any>
        ) => void
      ) => void;
    },
    clientSocket: Socket
  ) => {
    eventsHooks.forEach((hook, index, ref) => {
      clientSocket.on(hook.getEventName(), hook.handler);
    });
  };
  public listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
export default App;
