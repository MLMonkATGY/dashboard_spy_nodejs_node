import { Socket } from 'socket.io';
class SocketStore {
    private connectedSockets: Set<Socket>;
    constructor() {
        this.connectedSockets = new Set()
    }
    public addSocket = (client: Socket) => {
        this.connectedSockets.add(client);
    }
    public removeSocket = (client: Socket) => {
        this.connectedSockets.delete(client);
    }
    public getAllSockets = () => {
        return this.connectedSockets
    }
}
export default SocketStore;