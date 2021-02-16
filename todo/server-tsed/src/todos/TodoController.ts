import { BodyParams, Controller, Get, Inject, PathParams, Post, Put, $log, Delete } from '@tsed/common';
import { InternalServerError, NotFound } from '@tsed/exceptions';
import { Groups, Returns } from '@tsed/schema';
import { Todo } from './Todo';
import { TodoService } from './TodoService';

@Controller('/todo')
export class TodoController {

  @Inject(TodoService)
  private todoService: TodoService;

  @Get('/')
  @Returns(200, Array).Of(Todo).Groups('read')
  public async getTodos() {
    try {
      return await this.todoService.getTodos();  
    } catch (error) {
      throw new InternalServerError('Can\'t get todos !');
    }
  }

  @Post('/')
  @Returns(201, Todo).Groups('read')
  public async addTodo(@BodyParams() @Groups('create') todo: Todo) {
    try {
      return await this.todoService.addTodo({ ...todo, do: false });
    } catch (error) {
      throw new InternalServerError('Can\'t create todo !');
    }
  }

  @Put('/:id')
  @Returns(200)
  public async updateTodo(@PathParams("id") id: string, @BodyParams() @Groups('update') todo: Todo) {
    await this.todoService.todoExist(id);

    try {
      return await this.todoService.updateTodo(id, todo);
    } catch (error) {
      throw new InternalServerError('Can\'t update todo !');
    }
  }

  @Delete('/:id')
  @Returns(200)
  public async deleteTodo(@PathParams("id") id: string) {
    await this.todoService.todoExist(id);

    try {
      return await this.todoService.deleteTodo(id);
    } catch (error) {
      throw new InternalServerError('Can\'t delete todo !');
    }
  }
}