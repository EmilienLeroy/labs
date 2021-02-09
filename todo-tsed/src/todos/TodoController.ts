import { BodyParams, Controller, Get, Inject, Post } from '@tsed/common';
import { BadGateway, InternalServerError } from '@tsed/exceptions';
import { MongooseModel } from '@tsed/mongoose';
import { Todo } from './Todo';
import { TodoService } from './TodoService';

@Controller('/todo')
export class TodoController {

  @Inject(TodoService)
  private todoService: TodoService;

  @Get('/')
  public async getTodos() {
    try {
      return await this.todoService.getTodos();  
    } catch (error) {
      throw new InternalServerError('Can\'t get todos !');
    }
  }

  @Post('/')
  public async addTodo(@BodyParams() todo: { name: string }) {
    try {
      return await this.todoService.addTodo({ ...todo, do: false });
    } catch (error) {
      throw new InternalServerError('Can\'t create todo !');
    }
  }
}