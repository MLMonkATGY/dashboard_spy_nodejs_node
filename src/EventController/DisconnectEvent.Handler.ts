import IEventHandlerBase from "Interfaces/IEventHandlerBase.interface";
import SocketStore from "Singleton/SocketStore";
import { Socket } from "socket.io";

class DisconnectEventHandler implements IEventHandlerBase{
    private eventName: string = "disconnect";
 
    constructor() {
        
    }
    /**
     * handler
     */
    public handler(data:any, client:Socket, store : SocketStore) {
        console.log("on disconnect", data)
        store.removeSocket(client)
        console.log("After removing size:",store.getAllSockets().size)
    }
    public getEventName = () => {
        return this.eventName;
      };
}
export default DisconnectEventHandler;