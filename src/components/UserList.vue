<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="{id, name, email } in users" :key="id">
        <td>{{ name }}</td>
        <td>{{ email }}</td>
        <td>
          <router-link :to="`/edit/${id}}`">
            <button class="btn btn-primary btn-sm me-2">
              Edit
            </button>
          </router-link>
          <button class="btn btn-danger btn-sm" @click="deleteUser(id)">
            Delete
          </button>
        </td>
      </tr>
      </tbody>

    </table>
  </div>


</template>

<script>
import { subscribeToUsers, deleteUser } from "@/fb";

export default {
  data() {
    return {
      users: [],
      unsubscribeUsers: null,
    };
  },

  created() {
    this.unsubscribeUsers = subscribeToUsers((users) => {
      this.users = users;
    });
  },

  beforeUnmount() {
    if (this.unsubscribeUsers) {
      this.unsubscribeUsers();
    }
  },

  methods: {
    deleteUser,
  },
}
</script>
