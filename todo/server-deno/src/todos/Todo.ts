import { db } from '../config/db.ts';

interface Todo {
  _id: string;
  name: string;
  do: boolean;
}

const todos = db.collection<Todo>("todos");

export type {
  Todo
}

export { 
  todos
}