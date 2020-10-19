import iRepeatJobBase from "Interfaces/IRepeatJobBase.interface";
import bonjour from "bonjour"
import SocketStore from "Singleton/SocketStore";
class ScanLocalDeviceJob implements iRepeatJobBase {
    private intervalUpdate: number;
    private bonjourService: bonjour.Bonjour;
    private scanOption: any;
    private socketStore: SocketStore;

    constructor(intervalUpdate: number) {
        this.intervalUpdate = intervalUpdate;
        this.scanOption = {
            // protocol: 'tcp', type: 'http' 
            
        }
        this.bonjourService = bonjour()
     }
    public run = () => { 
        setInterval( this.handler, this.intervalUpdate)
    }
    public linkStore(store: any) { 
        this.socketStore = store;
    }
    public handler = async () => { 
        this.bonjourService.find(this.scanOption, (service:bonjour.RemoteService) => { 
            console.log(service)
        })
    }

 }
export default ScanLocalDeviceJob