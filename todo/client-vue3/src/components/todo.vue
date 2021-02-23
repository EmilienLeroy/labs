<template>
  <label class="form-checkbox">
    <input type="checkbox" v-model="checked">
    <i class="form-icon"></i> {{ name }}
  </label>
</template>


<script>
import { toRefs, watch } from 'vue';
import useTodo from '../composable/useTodo';

export default {
  props: {
    id: null,
    name: '',
    checked: false,
  },
  setup(props) {
    const { checkTodo } = useTodo();
    const { id, checked, name } = toRefs(props);
  
    watch(checked, async () => {
      await checkTodo({ id: id.value, checked: checked.value, name: name.value });
    })
  }
}
</script>