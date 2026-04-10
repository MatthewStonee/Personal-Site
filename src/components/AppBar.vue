<template>
  <div>
    <v-app-bar
        color="#1C1C21"
        elevate-on-scroll
        flat
    >

      <v-app-bar-nav-icon
          @click="drawer = true"
          class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>


      <div class="d-none d-sm-flex">
        <v-btn
            variant="text"
            size="large"
            class="text"
            @click="clickMethod()"
        >
          <span class="font-weight-bold">
            matthewstone
          </span>
        </v-btn>

        <v-menu offset-y open-on-hover close-on-content-click>
          <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                size="large"
                variant="text"
                class="text2"
            >
              Web Projects
              <v-icon size="large">mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="item in barMenu"
                :key="item.title"
                :to="item.route"
            >
              <template v-slot:prepend>
                <v-icon>{{ item.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
            variant="text"
            size="large"
            class="text2"
            href="https://github.com/MatthewStonee"
            target="_blank"
        >
          <span class="git">GitHub</span>
          <v-icon size="small">mdi-open-in-new</v-icon>
        </v-btn>

        <v-btn
            variant="text"
            size="large"
            class="text2"
            href="Matthew Stone Resume.pdf"
            download
        >
          <span class="git">Resume</span>
          <v-icon size="small">mdi-download</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <!-- Mobile drawer -->
    <v-navigation-drawer
        v-model="drawer"
        color="#33333D"
        temporary
    >
      <v-list nav>
        <v-list-item @click="clickMethod()">
          <v-list-item-title class="text">matthewstone</v-list-item-title>
        </v-list-item>

        <v-list-item
            v-for="item in barMenu"
            :key="item.title"
            :to="item.route"
        >
          <template v-slot:prepend>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text2">{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item href="https://github.com/MatthewStonee" target="_blank">
          <v-list-item-title class="text2">
            GitHub
            <v-icon color="white">mdi-open-in-new</v-icon>
          </v-list-item-title>
        </v-list-item>

        <v-list-item href="Matthew Stone Resume.pdf" download>
          <v-list-item-title class="text2">
            Resume
            <v-icon color="white">mdi-download</v-icon>
          </v-list-item-title>
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
          route: "/weather"
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

    methods: {
      clickMethod() {
        this.$router.push({ name: "home" }).catch(err => {
          console.log("Redundant Navigation, error: " + err)
        })
      },
    }
  };
</script>

<style scoped>

.text {
  color: white;
  font-family: Prompt, monospace;
  text-transform: lowercase;
  cursor: pointer;
}

.text2 {
  color: white;
  font-family: Prompt, monospace;
  text-transform: capitalize;
  cursor: pointer;
}

.git {
  margin-right: 7px;
}

</style>
