import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
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