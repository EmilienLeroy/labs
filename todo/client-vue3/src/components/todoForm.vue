<template>
  <div>
    <button @click="open = true" class="btn btn-primary form">Add</button>
    <teleport to="body">
      <div :class="`modal ${open ? 'active' : ''}`" id="modal-id">
        <a class="modal-overlay" aria-label="Close"></a>
        <div class="modal-container">
          <div class="modal-header">
            <a @click="open = false" class="btn btn-clear float-right" aria-label="Close"></a>
            <div class="modal-title h5">Add to do</div>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="form-group">
                <label class="form-label" for="input-example-1">Name</label>
                <input v-model="name" class="form-input" type="text" id="input-example-1" placeholder="Name">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="add" class="btn btn-primary mr-1">save</button>
            <button @click="open = false" class="btn ml-1">cancel</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import useTodo from '../composable/useTodo';

export default {
  data() {
    return {
      open: false,
    }
  },
  setup() {
    const { name, addTodo } = useTodo();
    return {
      name, 
      addTodo,
    }
  },
  methods: {
    async add() {
      await this.addTodo();
      this.open = false;
      this.$emit('submit');
    }
  }
}
</script>

<style scoped>
.form {
  margin: 20px 0px 0px 0;
  width: 100%;
}
</style>