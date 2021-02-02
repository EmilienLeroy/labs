import { ref, onMounted, inject } from 'vue';

export default function useTodo() {
  const http = inject('http');
  let id = ref(0);
  let name = ref('');
  const todos = ref([]);

  onMounted(async () => {
    todos.value.push(...await getTodo());
  })

  const getTodo = async () => {
    const res = await http('/todo');
    return res.json(); 
  }

  const addTodo = () => {
    id.value ++;
    todos.value.push({
      id: id.value,
      name: name.value,
      checked: false,
    });
  }

  return {
    name, 
    todos,
    addTodo,
    getTodo,
  }
};