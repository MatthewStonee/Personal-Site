<template>
  <div class="card card-body mt-4">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>
        <input
          v-model="form.email"
          class="form-control"
          type="email"
          required
        />
      </div>

      <button type="submit" class="btn btn-success mt-3">
        Create User
      </button>
    </form>
  </div>
</template>

<script>
import { createUser } from "@/fb";

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
      },
    };
  },

  methods: {
    async onSubmit() {
      await createUser({ ...this.form });
      this.form.name = '';
      this.form.email = '';
    },
  },
}

</script>
