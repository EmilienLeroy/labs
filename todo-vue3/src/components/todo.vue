<template>
  <div>
    {{ name }}
  </div>
</template>


<script>
export default {
  props: {
    id: null,
    name: '',
    checked: false,
  }
}
</script>