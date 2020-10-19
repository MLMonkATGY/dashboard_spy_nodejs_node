import { DiscoveryBroadcastDTO } from "DTO/DiscoveryBroadcastDTO";
import * as express from "express";
import { Request, Response } from "express";

import IControllerBase from "../Interfaces/ICotrollerBase.interface";

class HomeController implements IControllerBase {
  public path: string = "/";
  public router = express.Router();
  constructor() {
    this.initRoutes();
  }
  public initRoutes() {
    this.router.get("/", this.service);
    this.router.post("/", this.service);
    this.router.post("/streamingDataSink", this.streamingDataSink);

  }
  public service = (req: Request, res: Response) => {
    const users = ["aasdsas", "111111"];
    res.send(users);
  };
  public streamingDataSink = (req: Request, res: Response) => { 
    // let data = JSON.(req)
    console.log(req.method, req.url, req.headers);
    let body = '';
    let jsonBody = {}
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
      console.log(body);
      jsonBody = JSON.parse(body)
      console.log(jsonBody);
      res.send("ok");

    });
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
}
export default HomeController;
