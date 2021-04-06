import { Router } from "https://deno.land/x/oak/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { todos } from './Todo.ts';


const todoController = new Router({ prefix: '/todo' });

todoController.get('/', async ({ response }) => {
  response.body = await todos.find({}).toArray();
})

todoController.get('/:id',async ({ params, response }) => {
  const todo = await todos.findOne({ _id: new Bson.ObjectId(params.id) });
  
  if (!todo) {
    throw new Error('No todo');
  }

  response.body = todo;
})

todoController.post('/', async ({ request, response }) => {
  const body = await request.body({ type: "json" }).value;
  const newTodo = await todos.insertOne({
    name: body.name,
    do: false,
  });

  response.body = newTodo;
});

todoController.put('/:id', async ({ params, request, response }) => {
  const body = await request.body({ type: "json" }).value;
  const updateTodo = await todos.updateOne({ 
    _id: new Bson.ObjectId(params.id), 
  }, {
    name: body.name,
    do: body.do,
  });

  response.body = updateTodo;
})



export default  todoController;