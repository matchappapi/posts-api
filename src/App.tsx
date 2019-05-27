import express, { Application } from "express";
import cookieParse from "cookie-parser";
import bodyParser from "body-parser";
import loggerMiddleware from './helpers/middlewares/logger-middleware';
import errorMiddleware from "./helpers/middlewares/error-middleware";

class App {
  public app: Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(cookieParse());
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: any): void {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
