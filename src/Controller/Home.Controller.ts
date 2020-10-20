import { DiscoveryBroadcastDTO } from "DTO/DiscoveryBroadcastDTO";
import * as express from "express";
import { Request, Response } from "express";
import bonjour from "bonjour"

import IControllerBase from "../Interfaces/ICotrollerBase.interface";
import SocketStore from "Singleton/SocketStore";
import { Socket } from "socket.io";
// import * as EventEmitter from 'events';
const EventEmitter = require('events');

class HomeController implements IControllerBase {
  public path: string = "/";
  private bonjourService: bonjour.Bonjour;
  private eventEmitter: any;

  private socketStore: SocketStore;

  public router = express.Router();
  constructor() {
    this.initRoutes();
    this.bonjourService = bonjour()

  }
  
  public linkStore(store: any) { 
    this.socketStore = store;
  }
  
  public initRoutes() {
    this.router.get("/", this.service);
    this.router.post("/", this.service);
    this.router.post("/streamingDataSink", this.streamingDataSink);
    this.router.post("/pollStatus", this.getCurrentDeviceStatus);

  }
  public linkEventEmitter = (eventEmitter:any) => {
    this.eventEmitter = eventEmitter;
   }
  public service = (req: Request, res: Response) => {
    const users = ["aasdsas", "111111"];
    res.send(users);
  };
  public streamingDataSink = (req: Request, res: Response) => { 
    // let data = JSON.(req)
    console.log(req.method, req.url, req.headers);
    let jsonBody = req.body
    
    // await JSON.parse(req)
  }
  public discoveryService = (req: Request, res: Response) => {
    const discoveryDTO: DiscoveryBroadcastDTO = req.body;
    if (discoveryDTO.deviceId !== "70:85:c2:7d:af:77") { 
      res.status(403).send()
    }
    let responseData: DiscoveryBroadcastDTO = {
      deviceId: "aaa",
      localAddress : "local"
    }
    res.send(responseData)
  }
  public getCurrentDeviceStatus = (req: Request, res: Response) => { 
    console.log(req.method, req.url, req.headers);
    let jsonBody = req.body
    let payloadList = []
    this.eventEmitter.on("decryption_transfer", (decryptedPayload) => { 
      res.send(decryptedPayload)
      this.eventEmitter.removeAllListeners()

  })
    this.bonjourService.find({}, (service: bonjour.RemoteService) => { 
      // console.log(service)
      if (service.type != "ewelink") { 
        return
      }
      let data1 = service.txt.data1;
      let iv = service.txt.iv
      let targetDevice = jsonBody.devices.filter(info => {
        return info.deviceId ==service.txt.id
      })
      if (targetDevice.length == 0) { 
        return
      }
      let apiKey = targetDevice[0].apiKey

      let targetService :Socket = this.socketStore.getSocket("decrypt");
      if (targetService == null) { 
        return
    }
      if (data1 != null && iv != null) { 
        let now =  new Date()
          let payload = {
            apiKey,
            iv,
              data1
          }
          
        payloadList.push(payload)
        if ((payloadList.length) > 1) {
          targetService.emit("decrypt", payloadList)       }

         }
       
     
    })
    
  }
  public decryptionEventManager =  (targetService, payload, resp:Response) => { 
    this.eventEmitter.on("decryption_transfer", (decryptedPayload) => { 
      resp.send(decryptedPayload)
      // this.eventEmitter.removeAllListeners()
    })
    targetService.emit("decrypt", payload) 

  }
}
export default HomeController;
