import * as express from "express";
import { Request, Response } from "express";

import IControllerBase from "../Interfaces/ICotrollerBase.interface";
import { Socket } from "socket.io";
import IEventHandlerBase from "../Interfaces/IEventHandlerBase.interface";
import SocketStore from "Singleton/SocketStore";

class GatewayStatusUpdateEvent implements IEventHandlerBase {
  private eventName: string = "gateway_status";
  private store: SocketStore;
  public handler = (data: any, client:Socket, store : SocketStore): void => {
    console.log(this.eventName, "received :", data, "clientId :", client.id);
    store.addSocket(client)
    console.log("After adding size:",store.getAllSockets().size)
  };
  public getEventName = () => {
    return this.eventName;
  };
  public setConnectionSingleton = (store:SocketStore) => { 
    this.store = store;
  }
  
}
export default GatewayStatusUpdateEvent;
