import App from "./App.js";

import * as bodyParser from "body-parser";
import HomeController from "./Controller/Home.Controller.js";
import GatewayStatusUpdate from "./EventController/GatewayStatusUpdate.Handler.js";
import DisconnectEventHandler from "./EventController/DisconnectEvent.Handler.js";
import ScanLocalDeviceJob from "./Jobs/ScanLocalDeviceJob.js";
import ReceiveDecryptedEvent from "./EventController/ReceiveDecyptedEvent.Handler.js";
import SeedWhiteList from "./Seed/SeedAuthor.js"
import setupSchema from "./Seed/CreateSchema.js";
import GetThumbnailByAuthor from "./Jobs/GetThmbnailByAuthor.js";

  
const app: App = new App({
    port: 7900,
    controller: [
      // new HomeController()
    
    ],
    middleware: [
      // bodyParser.json(),
      // bodyParser.urlencoded({ extended: true })
    ],
    websocketHandler: [
      // new GatewayStatusUpdate(),
      // new DisconnectEventHandler()
      // , new ReceiveDecryptedEvent()
    ],
    jobHandler: [
      // new SeedWihiteList()
      new GetThumbnailByAuthor()
      // new GetBatteryLevelJob(4000),
    ],
  });
// setupSchema();
// SeedWhiteList();
app.listen();
  



