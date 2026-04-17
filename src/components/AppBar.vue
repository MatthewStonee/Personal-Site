<template>
  <div>
    <v-app-bar
      class="site-nav"
      color="rgba(28, 28, 33, 0.82)"
      flat
    >
      <div class="nav-shell">
        <v-app-bar-nav-icon
          aria-label="Open navigation"
          class="nav-toggle d-flex d-sm-none"
          @click="drawer = true"
        />

        <router-link
          :to="{ name: 'home' }"
          class="brand-link"
        >
          matthewstone
        </router-link>

        <div class="nav-links d-none d-sm-flex">
          <v-menu offset-y open-on-hover close-on-content-click>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                class="nav-link"
                size="large"
                variant="text"
              >
                Projects
                <v-icon aria-hidden="true" size="small">mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="item in barMenu"
                :key="item.title"
                :to="item.route"
              >
                <template #prepend>
                  <v-icon>{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </div>

        <v-spacer />

        <v-btn
          class="nav-resume d-none d-sm-inline-flex"
          download
          href="/Matthew Stone Resume.pdf"
          rounded="pill"
          size="large"
        >
          Resume
          <v-icon aria-hidden="true" size="small">mdi-download</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="#17181d"
      temporary
    >
      <v-list nav>
        <v-list-item :to="{ name: 'home' }" @click="drawer = false">
          <v-list-item-title class="mobile-brand">matthewstone</v-list-item-title>
        </v-list-item>

        <v-list-item
          download
          href="/Matthew Stone Resume.pdf"
          @click="drawer = false"
        >
          <template #prepend>
            <v-icon class="mobile-accent-icon">mdi-download</v-icon>
          </template>
          <v-list-item-title class="mobile-link mobile-link-accent">Resume</v-list-item-title>
        </v-list-item>

        <v-list-subheader class="mobile-subheader">Projects</v-list-subheader>

        <v-list-item
          v-for="item in barMenu"
          :key="item.title"
          :to="item.route"
          @click="drawer = false"
        >
          <template #prepend>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="mobile-link">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",

  data: () => ({
    barMenu: [
      {
        icon: "mdi-weight-lifter",
        title: "One Rep Max Calculator",
        route: "/onerm",
      },
      {
        icon: "mdi-weather-partly-cloudy",
        title: "Weather App",
        route: "/weather",
      },
      {
        icon: "mdi-calculator",
        title: "Simple Calculator",
        route: "/calculator",
      },
      {
        icon: "mdi-basketball",
        title: "NBA Game Scores",
        route: "/NBA",
      },
    ],
    drawer: false,
  }),
};
</script>

<style scoped>
.site-nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.site-nav :deep(.v-toolbar__content) {
  padding: 0;
}

.nav-shell {
  width: min(1180px, calc(100% - 32px));
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-toggle {
  color: white;
}

.brand-link,
.nav-link,
.nav-resume {
  text-transform: none;
  letter-spacing: 0.01em;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  color: white;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.45rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: lowercase;
}

.brand-link:hover {
  color: rgba(255, 255, 255, 0.9);
}

.nav-links {
  align-items: center;
  gap: 4px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.76);
}

.nav-link:hover {
  color: white;
}

.nav-resume {
  background-color: var(--accent-color);
  color: #10141b;
  box-shadow: 0 12px 30px rgba(124, 143, 184, 0.18);
}

.brand-link:focus-visible,
.nav-link:focus-visible,
.nav-resume:focus-visible,
.nav-toggle:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 4px;
}

.mobile-brand {
  color: white;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.08em;
}

.mobile-link {
  color: white;
  font-family: Prompt, sans-serif;
}

.mobile-link-accent {
  color: var(--accent-color);
}

.mobile-accent-icon {
  color: var(--accent-color);
}

.mobile-subheader {
  color: rgba(255, 255, 255, 0.55);
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 0.12em;
}

@media (max-width: 599px) {
  .nav-shell {
    width: calc(100% - 16px);
  }
}
</style>
