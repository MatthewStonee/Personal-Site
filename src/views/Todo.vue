<template>
  <v-container>

    <ul>
      <v-list>
        <v-list-item  v-for="todo in todos" v-bind:key="todo">
          {{ todo }}
        </v-list-item>
      </v-list>
    </ul>

    <v-row>
      <v-col cols="12">
        <v-form v-on:submit.prevent="addTodo">
          <v-text-field v-model="todoText" placeholder="What needs to be done?" solo></v-text-field>
          <v-btn type="submit">Add Todo</v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function () {
    return {
      todos: [],
      todoText: '',
    };
  },
  methods: {
    addTodo: function () {
      this.todos = [...this.todos, this.todoText];
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
  },
  mounted: function () {
    const existingTodos = localStorage.getItem('todos');
    this.todos = JSON.parse(existingTodos) || [];
  }
};
</script>

<style>
</style>
