<template>
  <label class="form-checkbox">
    <input type="checkbox">
    <i class="form-icon"></i> {{ name }}
  </label>
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