<template>
  <v-app id="grad">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <AppBar />
    <v-main id="main-content" tabindex="-1">
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
:root {
  color-scheme: dark;
}

html,
body {
  background-color: rgb(28, 28, 33);
}

#grad {
  --accent-color: #7c8fb8;
  --app-bar-height: 64px;
  background-color: rgb(28, 28, 33);
  color-scheme: dark;
  overflow-x: hidden;
}

#main-content {
  outline: none;
}

.skip-link {
  position: fixed;
  top: 14px;
  left: 14px;
  z-index: 2000;
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--accent-color);
  color: #10141b;
  font-family: Prompt, sans-serif;
  font-size: 0.92rem;
  text-decoration: none;
  transform: translateY(-180%);
  transition: transform 180ms ease;
}

.skip-link:focus-visible {
  transform: translateY(0);
}

@font-face {
  font-family: "Bebas Neue";
  src: local("Bebas Neue"),
  url(./fonts/BebasNeue-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Prompt";
  src: local("Prompt"),
  url(./fonts/prompt/Prompt-Regular.ttf) format("truetype");
}

@media (max-width: 599px) {
  #grad {
    --app-bar-height: 56px;
  }
}
</style>

<script>
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",

  components: { AppBar }
}
</script>
