import { BodyParams, Controller, Get, Inject, PathParams, Post, Put, $log, Delete } from '@tsed/common';
import { InternalServerError, NotFound } from '@tsed/exceptions';
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

  @Put('/:id')
  public async updateTodo(@PathParams("id") id: string, @BodyParams() todo: Todo) {
    await this.todoService.todoExist(id);

    try {
      return await this.todoService.updateTodo(id, todo);
    } catch (error) {
      throw new InternalServerError('Can\'t update todo !');
    }
  }

  @Delete('/:id')
  public async deleteTodo(@PathParams("id") id: string) {
    await this.todoService.todoExist(id);

    try {
      return await this.todoService.deleteTodo(id);
    } catch (error) {
      throw new InternalServerError('Can\'t delete todo !');
    }
  }
}