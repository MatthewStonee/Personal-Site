<template>
  <v-app id="grad" :data-theme="themeName">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <AppBar />
    <v-main id="main-content" tabindex="-1">
      <router-view />
    </v-main>
    <GlobalErrorToast />
  </v-app>
</template>

<style>
:root {
  color-scheme: dark;
}

:root[data-theme='light'] {
  color-scheme: light;
}

html,
body,
#app {
  min-height: 100%;
  background-color: var(--page-background, rgb(28, 28, 33));
  color: var(--page-foreground, white);
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

#grad {
  --accent-color: #7c8fb8;
  --app-bar-height: 64px;
  --page-background: rgb(28, 28, 33);
  --page-background-alt: rgb(22, 23, 28);
  --page-foreground: #ffffff;
  --page-muted: rgba(255, 255, 255, 0.76);
  --surface-border: rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, var(--page-background) 0%, var(--page-background-alt) 100%);
  color: var(--page-foreground);
  overflow-x: hidden;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

#grad[data-theme='light'] {
  --page-background: #f4f6fb;
  --page-background-alt: #eef2f8;
  --page-foreground: #10141b;
  --page-muted: rgba(16, 20, 27, 0.72);
  --surface-border: rgba(16, 20, 27, 0.1);
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
  font-display: swap;
  src: local("Bebas Neue"),
  url(./fonts/BebasNeue-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Prompt";
  font-display: swap;
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
import AppBar from './components/AppBar.vue'
import GlobalErrorToast from './components/GlobalErrorToast.vue'
import { useSiteTheme } from './composables/useSiteTheme'

export default {
  name: 'App',

  components: {
    AppBar,
    GlobalErrorToast,
  },

  setup() {
    const { themeName } = useSiteTheme()

    return {
      themeName,
    }
  },
}
</script>
