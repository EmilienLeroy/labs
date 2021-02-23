<template>
  <div class="app bg-gray">
    <todos />
  </div>
</template>

<script>
import { todos } from './components';

export default {
  name: 'App',
  components: {
    todos,
  }
}
</script>

<style scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>