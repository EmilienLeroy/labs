import {Env} from "@tsed/core";
import {Configuration, Inject} from "@tsed/di";
import {$log, BeforeRoutesInit, PlatformApplication} from "@tsed/common";
import { TodoController, TodoService } from './todos';
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/mongoose"; 
import "@tsed/swagger";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import { config } from "dotenv";

config();

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json"
    }
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json"
    }
  });
}

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    disableRoutesSummary: isProduction
  },
  mongoose: {
    url: String(process.env.MONGO_URL),
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  mount: {
    "/": [
      TodoController,
    ]
  },
  componentsScan: [
    TodoService as any,
  ],
  swagger: [
    {
      path: "/v2/docs",
      specVersion: "2.0",
    },
    {
      path: "/v3/docs",
      specVersion: "3.0.1"
    }
  ],
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server implements BeforeRoutesInit {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
