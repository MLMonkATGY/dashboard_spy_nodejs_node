import { Application } from "express";
import ioserver, { Socket } from "socket.io";
import HomeEventHandler from "./EventController/Test.EventHandler";
import TestEventHandler from "./EventController/Test2";
import IEventHandlerBase from "./Interfaces/IEventHandlerBase.interface";
import GetBatteryLevelJob from "./Jobs/GetBatteryLevelJob";
const express = require("express");
class App {
  public app: Application;
  public port: number;
  public websocket: any;
  public server: any;
  public io: any;
  public eventHandlers: Array<any>;
  constructor(appInit: {
    port: number;
    middleware: any;
    controller: any;
    websocketHandler: any;
  }) {
    this.app = express();
    this.port = appInit.port;
    this.server = require("http").Server(this.app);
    if (appInit.websocketHandler) {
      this.io = ioserver(this.server);
      this.eventHandlers = appInit.websocketHandler;
      this.io.on("connection", this.onConnectionHandler);
    }

    // this.middlewares(app.middlewares);
    this.routes(appInit.controller);
    let a = new GetBatteryLevelJob(2000);
    a.run();
  }
  private onConnectionHandler = (clientSocket: Socket) => {
    this.socketEventRegister(this.eventHandlers, clientSocket);
    clientSocket.emit("aaa", "this is from server");
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
