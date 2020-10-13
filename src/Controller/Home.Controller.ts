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
  }
  private service = (req: Request, res: Response): Array<string> => {
    const users = ["aasdsas", "111111"];
    return users;
  };
}
export default HomeController;
