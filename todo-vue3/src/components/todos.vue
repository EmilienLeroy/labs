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
import { ref } from 'vue';
import todo from './todo.vue';

export default {
  components:  {
    todo,
  },
  setup() {
    let id = ref(0);
    const name = ref('');
    const todos = ref([]);

    const addTodo = () => {
      id.value ++;
      todos.value.push({
        id: id.value,
        name: name.value,
        checked: false,
      })
    }

    return {
      name,
      todos,
      addTodo
    }
  }
}
</script>