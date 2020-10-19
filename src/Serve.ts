import App from "./App";

import * as bodyParser from "body-parser";
import HomeController from "./Controller/Home.Controller";
import GatewayStatusUpdate from "./EventController/GatewayStatusUpdate.Handler";
import GetBatteryLevelJob from "./Jobs/GetBatteryLevelJob";
import DisconnectEventHandler from "./EventController/DisconnectEvent.Handler";
const app: App = new App({
  port: 7878,
  controller: [new HomeController()],
  middleware: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
  websocketHandler: [new GatewayStatusUpdate(), new DisconnectEventHandler()],
  jobHandler: [
   
    // new GetBatteryLevelJob(4000, "ls"),
  ],
});

app.listen();
