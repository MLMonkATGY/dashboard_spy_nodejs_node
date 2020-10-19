import { spawn } from "child_process";
import SocketStore from "Singleton/SocketStore";
import iRepeatJobBase from "../Interfaces/IRepeatJobBase.interface";
class GetBatteryLevelJob implements iRepeatJobBase {
  private intervalUpdate: number;
  private socketStore: SocketStore;
  constructor(intervalUpdate) {
    this.intervalUpdate = intervalUpdate;

  }
  public linkStore = (store:SocketStore) => {
    this.socketStore = store;

  }
  public run = (runAtStartup: boolean) => {
    if (runAtStartup) {
      this.handler();
    }
    setInterval(this.handler, this.intervalUpdate);
  };
  private handler = async () => {
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('/sys/class/power_supply/battery/capacity')
    });

    lineReader.on('line', (line: string) => {
      let percentageLeft: number = Number(line);
      let allActiveConn = this.socketStore.getAllSockets()
      allActiveConn.forEach(element => {
        element.emit("debug", percentageLeft)
      });
    });



  };

}
export default GetBatteryLevelJob;
