import { Application } from "oak";
import { oakCors } from "cors";
import { TodoController } from './todos/index.ts';

const app = new Application();

app.use(
  oakCors({
    origin: "*",
    optionsSuccessStatus: 200,
  }),
)

app.use(TodoController.routes());
app.use(TodoController.allowedMethods());

export {
  app
}