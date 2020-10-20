import App from "./App";

import * as bodyParser from "body-parser";
import HomeController from "./Controller/Home.Controller";
import GatewayStatusUpdate from "./EventController/GatewayStatusUpdate.Handler";
import GetBatteryLevelJob from "./Jobs/GetBatteryLevelJob";
import DisconnectEventHandler from "./EventController/DisconnectEvent.Handler";
import ScanLocalDeviceJob from "./Jobs/ScanLocalDeviceJob";
import ReceiveDecryptedEvent from "./EventController/ReceiveDecyptedEvent.Handler";
const app: App = new App({
  port: 7878,
  controller: [new HomeController()],
  middleware: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })],
  websocketHandler: [
    new GatewayStatusUpdate(),
    new DisconnectEventHandler()
  , new ReceiveDecryptedEvent()
  ],
  jobHandler: [
  //  new ScanLocalDeviceJob(1000)
    // new GetBatteryLevelJob(4000, "ls"),
  ],
});

app.listen();
