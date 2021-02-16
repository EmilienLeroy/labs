<template>
  <div>
    <input type="text" v-model="name">
    <input type="submit" @click.prevent="addTodo">
    <todo 
      v-for="todo in todos" 
      :key="todo.id" 
      :name="todo.name" 
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import todo from './todo.vue';
import useTodo from '../composable/useTodo';

export default {
  components:  {
    todo,
  },
  setup() {
    return useTodo();
  }
}
</script>