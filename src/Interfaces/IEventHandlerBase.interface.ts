import SocketStore from "Singleton/SocketStore";
import { Socket } from "socket.io";

interface IEventHandlerBase {
  handler(data: any, client:Socket, socketStoreRef : SocketStore): any;
  getEventName(): string;
}
export default IEventHandlerBase;
