import { BodyParams, Controller, Get, Inject, Post } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Todo } from '../models/Todo';

@Controller('/todo')
export class TodoController {
  @Inject(Todo)
  private Todo: MongooseModel<Todo>;

  @Get('/')
  public async getTodos() {
    return await this.Todo.find({});
  }

  @Post('/')
  public async addTodo(@BodyParams() todo: { name: string }) {
    return await new this.Todo({ ...todo, do: false }).save();
  }
}