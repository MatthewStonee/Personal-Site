<template>
  <section class="walkthrough">
    <h1 class="d-sr-only">3D Apartment Walkthrough</h1>
    <iframe
      class="walkthrough-frame"
      :src="frameSrc"
      title="3D apartment walkthrough"
      allow="fullscreen"
      allowfullscreen
    />
  </section>
</template>

<script>
import { computed } from 'vue'
import { useSiteTheme } from '../composables/useSiteTheme'

export default {
  name: 'Walkthrough',

  setup() {
    const { themeName } = useSiteTheme()

    // The walkthrough is a standalone page in public/. Passing the theme in the hash restyles
    // its HUD when the site theme changes, without reloading the 3D scene.
    const frameSrc = computed(() => `/apartment-walkthrough.html#theme=${themeName.value}`)

    return {
      frameSrc,
    }
  },
}
</script>

<style scoped>
.walkthrough {
  height: calc(100svh - var(--v-layout-top, var(--app-bar-height)));
}

.walkthrough-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
