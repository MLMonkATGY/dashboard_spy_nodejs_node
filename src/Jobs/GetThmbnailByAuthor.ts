import { spawn } from "child_process";
import SocketStore from "Singleton/SocketStore";
import iRepeatJobBase from "../Interfaces/IRepeatJobBase.interface";
import { firefox, Browser, Page, BrowserContext } from "playwright";
import path  from "path";

import fs from "fs";
class GetThumbnailByAuthor implements iRepeatJobBase {
  private intervalUpdate: number;
  private socketStore: SocketStore;
  constructor() {

  }
  public linkStore = (store: SocketStore) => {
    this.socketStore = store;

  }
  public run = (runAtStartup: boolean) => {
    this.handler();

    
  };
  public getUserPrefString = (port:number)=>{
    return  `
    user_pref("browser.aboutwelcome.enabled", false)
    user_pref("network.proxy.socks", 127.0.0.1);
    user_pref("network.proxy.type", 1);
    user_pref("network.proxy.socks_port", ${port});
    user_pref("network.proxy.socks_remote_dns", true);  
    user_pref("network.proxy.socks_version", 5);
	`;
  }
  public generateBrowserContext = async(browserInstance : number):Promise<BrowserContext[]>=>{
    let tmpDir = "/home/alextay96/Desktop/workspace/dashboard_spy_nodejs_node/resources/tmp";
    let allBrowserContext :Array<BrowserContext> = [];
    const lowestPort = 8000
    let allOccupiedPorts = new Set()
    fs.rmdirSync(tmpDir,  { recursive: true })
    for(let i = 0 ;i < browserInstance; i++){
      let portNum = 0
      while(true){
        portNum = lowestPort + Math.round((Math.random()*100) % browserInstance)
        if(!allOccupiedPorts.has(portNum)){
          allOccupiedPorts.add(portNum)
          break;
        }
      }
      
      let userPrefString = this.getUserPrefString(portNum)
      let userDataDir = tmpDir + `/${i}`
      fs.mkdirSync(userDataDir, { recursive: true });

      fs.writeFileSync(path.join(userDataDir, "user.js"), userPrefString);
      const browser : BrowserContext = await firefox.launchPersistentContext(
        userDataDir, {
            headless: false,
        });
      allBrowserContext.push(browser)
    }
    return allBrowserContext
  }
  /**
   * pageScheduler
   */
  public pageScheduler = async(allBrowser:BrowserContext[], pagenum:number)=> {
    
  }
  private handler = async () => {
    let allBrowser:BrowserContext[] = await this.generateBrowserContext(2)
    await this.pageScheduler(allBrowser, 2);

    



  };

}
export default GetThumbnailByAuthor;
