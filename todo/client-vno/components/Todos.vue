<template>
  <div>
    <Todo v-for="todo in todos" :key="todo._id" :todo="todo" />
  </div>
</template>

<script>
import Todo from './Todo.vue';

export default {
  components: {
    Todo
  },
  data() {
    return {
      todos: []
    }
  },
  async mounted() {
    const res = await fetch('http://localhost:8083/todo');
    const data = await res.json();

    this.todos = data;
  },
}
</script>