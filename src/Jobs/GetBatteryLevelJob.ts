import { spawn } from "child_process";
import iRepeatJobBase from "../Interfaces/IRepeatJobBase.interface";
class GetBatteryLevelJob implements iRepeatJobBase {
  private intervalUpdate: number;
  private terminalCommand: string;

  constructor(intervalUpdate, terminalCommand) {
    this.intervalUpdate = intervalUpdate;
    this.terminalCommand = terminalCommand;
  }
  public run = (runAtStartup: boolean) => {
    if (runAtStartup) {
      this.handler();
    }
    setInterval(this.handler, this.intervalUpdate);
  };
  private handler = async () => {
    const childProcess = spawn(this.terminalCommand);
    let data = "";
    for await (const chunk of childProcess.stdout) {
      console.log("stdout chunk: " + chunk);
      data += chunk;
    }
    let error = "";
    for await (const chunk of childProcess.stderr) {
      console.error("stderr chunk: " + chunk);
      error += chunk;
    }
    const exitCode = await new Promise((resolve, reject) => {
      childProcess.on("close", resolve);
      console.log("closed resolve promise");
    });

    if (exitCode) {
      throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }
  };
}
export default GetBatteryLevelJob;
