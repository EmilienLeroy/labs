<template>
  <div id="app">
    <Todos />
  </div>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: 'app',
  components: {
    Todos,
  }
};
</script>