import * as express from "express";
import { Request, Response } from "express";

import IControllerBase from "../Interfaces/ICotrollerBase.interface";
import { Socket } from "socket.io";
import IEventHandlerBase from "../Interfaces/IEventHandlerBase.interface";

class GatewayStatusUpdateEvent implements IEventHandlerBase {
  private eventName: string = "gateway_status";
  public handler = (data: any): void => {
    console.log(this.eventName, " received", data);
  };
  public getEventName = () => {
    return this.eventName;
  };
}
export default GatewayStatusUpdateEvent;
