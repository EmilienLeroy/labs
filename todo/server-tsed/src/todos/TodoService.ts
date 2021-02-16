import { Service, $log, Inject } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { MongooseModel, ObjectID } from '@tsed/mongoose';
import { Todo } from './Todo';

@Service()
export class TodoService {
  @Inject(Todo)
  private Todo: MongooseModel<Todo>;

  public async todoExist(id: string) {
    const todo = await this.getTodo(id);

    if (!todo) {
      throw new NotFound('Can\'t find todo !');
    }

    return true;
  }
  
  public async getTodos() {
    return await this.Todo.find({});
  }

  public async getTodo(_id: string) {
    return await this.Todo.findOne({ _id });
  }

  public async addTodo(todo: Omit<Todo, '_id'>) {
    return await new this.Todo(todo).save();
  }

  public async updateTodo(_id: string, todo: Omit<Todo, '_id'>) {
    return await this.Todo.updateOne({ _id },{ ...todo });
  }

  public async deleteTodo(_id: string) {
    return await this.Todo.deleteOne({ _id });
  }
}

