<template>
  <div class="todos card">
    <h3>TO DO</h3>
    <div class="todos__content">
      <todo 
        v-for="todo in todos" 
        :key="todo._id" 
        :id="todo._id"
        :name="todo.name" 
        :checked="todo.do"
      />
    </div>
    <todo-form @submit="fetchTodo" />
  </div>
</template>

<script>
import todo from './todo.vue';
import todoForm from './todoForm.vue';
import useTodo from '../composable/useTodo';

export default {
  components:  {
    todo,
    todoForm
  },
  data(){
    return {
      color: 'white',
    }
  },
  setup() {
    return useTodo();
  },
}
</script>

<style scoped>
.todos {
  padding: 30px;
  background-color: v-bind(color);
  box-shadow: 0 0.25rem 1rem rgb(48 55 66 / 15%);
}

.todos__content {
  overflow: auto;
  width: 350px;
  height: 400px;
}

</style>