import { ref, onMounted, inject } from 'vue';

export default function useTodo() {
  const http = inject('http');
  let name = ref('');
  let todos = ref([]);

  onMounted(async () => {
    todos.value.push(...await getTodo());
  })

  const getTodo = async () => {
    const res = await http('/todo');
    return res.json(); 
  }

  const addTodo = async () => {
    const res = await http('/todo', 'POST', { name: name.value });
    todos.value.push(await res.json());
  }

  const fetchTodo = async () => {
    todos.value = await getTodo();
  }

  return {
    name, 
    todos,
    addTodo,
    getTodo,
    fetchTodo,
  }
};