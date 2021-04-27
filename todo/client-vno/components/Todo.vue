<template>
  <div class="form-group">
    <label class="form-checkbox">
      <input type="checkbox" v-model="todo.do">
      <i class="form-icon"></i> {{ todo.name }}
    </label>
  </div>
</template>

<script>
export default {
  props: ['todo']
}
</script>