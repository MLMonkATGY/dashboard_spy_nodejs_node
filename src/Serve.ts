import App from "./App";

import * as bodyParser from "body-parser";
import HomeController from "./Controller/Home.Controller";
const app: App = new App({
  port: 7878,
  controller: [new HomeController()],
  middleware: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});
app.listen();
