<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="10" rounded="lg">
          <v-card-title class="todo-title">Todo List</v-card-title>

          <v-card-text>
            <v-form class="todo-form" @submit.prevent="addTodo">
              <v-text-field
                v-model="todoText"
                placeholder="What needs to be done?"
                aria-label="New todo"
                variant="outlined"
                density="comfortable"
                hide-details
              ></v-text-field>
              <v-btn type="submit" size="large" :disabled="!todoText.trim()">Add</v-btn>
            </v-form>

            <v-list v-if="todos.length > 0" class="todo-list">
              <v-list-item v-for="todo in todos" :key="todo.id">
                <template #prepend>
                  <v-checkbox-btn
                    v-model="todo.done"
                    :aria-label="`Mark ${todo.text} as done`"
                  ></v-checkbox-btn>
                </template>

                <v-list-item-title :class="{ done: todo.done }">{{ todo.text }}</v-list-item-title>

                <template #append>
                  <v-btn
                    icon="mdi-delete-outline"
                    variant="text"
                    size="small"
                    :aria-label="`Delete ${todo.text}`"
                    @click="removeTodo(todo.id)"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>

            <p v-else class="empty-state">Nothing to do yet. Add your first task above.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const STORAGE_KEY = 'todos'

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

// Storage can be unavailable (privacy modes) or hold data from an older version of this page,
// which saved plain strings.
function loadTodos() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(stored)) return []
    return stored
      .map((item) => (typeof item === 'string' ? { id: createId(), text: item, done: false } : item))
      .filter((item) => item && typeof item.text === 'string' && item.text.trim())
  } catch (_error) {
    return []
  }
}

function saveTodos(todos) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (_error) {
    // Without storage the list still works for this visit.
  }
}

export default {
  name: 'Todo',

  data: () => ({
    todos: loadTodos(),
    todoText: '',
  }),

  watch: {
    todos: {
      handler: saveTodos,
      deep: true,
    },
  },

  methods: {
    addTodo() {
      const text = this.todoText.trim()
      if (!text) return
      this.todos.push({ id: createId(), text, done: false })
      this.todoText = ''
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
  },
}
</script>

<style scoped>
.todo-title {
  font-size: clamp(18px, 4vw, 30px);
  font-weight: 800;
  text-align: center;
  white-space: normal;
}

.todo-form {
  display: flex;
  gap: 12px;
  align-items: center;
}

.todo-list {
  margin-top: 12px;
  background: transparent;
}

.done {
  text-decoration: line-through;
  opacity: 0.6;
}

.empty-state {
  margin: 20px 0 4px;
  text-align: center;
  opacity: 0.7;
}
</style>
