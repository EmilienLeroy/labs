import { Router, Status } from "oak";
import { Bson } from "mongo";
import { todos } from './Todo.ts';


const todoController = new Router({ prefix: '/todo' });

todoController.get('/', async (context) => {
  const { response } = context;
  try {
    response.body = await todos.find({}).toArray();
  } catch {
    context.throw(Status.InternalServerError);
  }
})

todoController.get('/:id',async (context) => {
  const { response, params } = context;
  try {
    if (Bson.ObjectId.isValid(params.id)) {
      const todo = await todos.findOne({ _id: new Bson.ObjectId(params.id) });
      if (!todo) {
        context.throw(Status.NotFound);
      }

      response.body = todo;
      return;
    }

    context.throw(Status.NotFound);
  } catch(err) {
    context.throw(err.status);
  }
})

todoController.post('/', async (context) => {
  const { request, response } = context;
  try {
    const body = await request.body({ type: "json" }).value;
    const newTodo = await todos.insertOne({
      name: body.name,
      do: false,
    });
  
    response.body = newTodo;
  } catch(err) {
    context.throw(Status.InternalServerError);
  }
});

todoController.put('/:id', async (context) => {
  const { params, request, response } = context;
  try {
    if (Bson.ObjectId.isValid(params.id)) {
      const body = await request.body({ type: "json" }).value;
      const updateTodo = await todos.updateOne({ 
        _id: new Bson.ObjectId(params.id), 
      }, {
        name: body.name,
        do: body.do,
      });
  
      response.body = updateTodo;
      return;
    }

    context.throw(Status.NotFound);
  } catch(err) {
    context.throw(err.status);
  }
})



export default  todoController;