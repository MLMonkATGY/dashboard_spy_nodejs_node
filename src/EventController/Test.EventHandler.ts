import * as express from "express";
import { Request, Response } from "express";

import IControllerBase from "../Interfaces/ICotrollerBase.interface";
import { Socket } from "socket.io";
import IEventHandlerBase from "../Interfaces/IEventHandlerBase.interface";

class HomeEventHandler implements IEventHandlerBase {
  private eventName: string = "test1";
  public handler = (data: any): void => {
    console.log("I got data", data);
  };
  public getEventName = () => {
    return this.eventName;
  };
}
export default HomeEventHandler;
