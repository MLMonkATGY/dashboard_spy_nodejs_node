import * as express from "express";
import { Application } from "express";
class App {
  public app: Application;
  public port: number;
  constructor(appInit: { port: number; middleware: any; controller: any }) {
    this.app = express();
    this.port = appInit.port;
    // this.middlewares(app.middlewares);
    this.routes(appInit.controller);
  }
  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }
  private routes(controllers: {
    forEach: (
      arg: (controller: any, index: number, entireArray: any) => number
    ) => void;
  }) {
    controllers.forEach((controller, index, entireArray) => {
      this.app.use("/", controller.router);
      return 1;
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
export default App;
