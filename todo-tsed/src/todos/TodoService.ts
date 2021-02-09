import { Service, $log, Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Todo } from './Todo';

@Service()
export class TodoService {
  @Inject(Todo)
  private Todo: MongooseModel<Todo>;
  
  public async getTodos() {
    return await this.Todo.find({});
  }

  public async addTodo(todo: Omit<Todo, '_id'>) {
    return await new this.Todo(todo).save();
  }
}

