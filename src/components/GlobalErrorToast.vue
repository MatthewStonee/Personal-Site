<template>
  <v-snackbar
    v-model="errorToastState.visible"
    color="error"
    location="top right"
    rounded="pill"
    timeout="6000"
  >
    {{ errorToastState.message }}

    <template #actions>
      <v-btn
        aria-label="Dismiss error notification"
        icon="mdi-close"
        variant="text"
        @click="dismissGlobalError"
      />
    </template>
  </v-snackbar>
</template>

<script>
import { dismissGlobalError, errorToastState } from '../stores/errorToast'

export default {
  name: 'GlobalErrorToast',

  setup() {
    return {
      dismissGlobalError,
      errorToastState,
    }
  },
}
</script>
