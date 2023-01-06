<template>
  <div class="card card-body mt-4">
    <h3>Edit Users</h3>
    <form @submit.prevent="update">
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
        >
      </div>

      <button type="submit" class="btn btn-primary mt-3">
        Update
      </button>

    </form>
  </div>


</template>

<script>

export default {

}
</script>