<template>
  <v-app-bar
      color='#1C1C21'
      elevate-on-scroll
      dense
      dark
      flat
  >

    <v-app-bar-nav-icon @click="drawer = true"
                        class="d-flex d-sm-none"
    ></v-app-bar-nav-icon>






    <v-toolbar-items
        class="d-none d-sm-flex">
      <v-btn
          text
          large
          class="text"
          @click="clickMethod()"
      >
          <span class="font-weight-bold">
            matthewstone
          </span>
      </v-btn>

      <v-menu offset-y open-on-click open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs" v-on="on"
              large
              text
              class="text2"
          >
            <span>
              Web Projects
            </span>
            <v-icon large>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="item in barMenu"
              :key="item.title"
              :icon="item.icon"
              router
              :to="item.route"
          >
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <v-list-item-title>{{
                item.title
              }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
          text
          large
          class="text2"
          onclick="window.open('https://github.com/MatthewStonee','_blank')"
      >
        <span class="git">GitHub</span>
        <v-icon dense>mdi-open-in-new</v-icon>

      </v-btn>

      <v-btn
          text
          large
          class="text2"
          href="Matthew Stone Resume.pdf"
          download>
        <span class="git">Resume</span>
        <v-icon dense>mdi-download</v-icon>

      </v-btn>


    </v-toolbar-items>

  <v-spacer></v-spacer>


  </v-app-bar>
</template>

<script>
  export default {
    name: "AppBar",

    data: () => ({
      barMenu: [
        {
          icon: "mdi-weight-lifter",
          title: "One Rep Max Calculator",
          route: "/OneRM",
        },
        {
          icon: "mdi-weather-partly-cloudy",
          title: "Weather App",
          route: "/weather"
        },
        { icon: "mdi-calculator",
          title: "Simple Calculator",
          route: "/calculator",
        },
        {
          icon: "mdi-basketball",
          title: "NBA Game Scores",
          route: "/NBA",
        },
      ],
  }),

    methods: {
      clickMethod() {
        this.$router.push({ name: "home" }).catch(err => {console.log("Redundant Navigation, error: " + err)})
      },
      isMobile() {
        if(this.$vuetify.breakpoint.xsOnly)
        {
          return true;
        }
        else
          return this.isLarge();
      },
      isLarge() {
        return true;
      }
    }

  };
</script>

<style scoped>

.text {
  font-family: Prompt, monospace;
  text-transform: lowercase;
}

.text2 {
  font-family: Prompt, monospace;
  text-transform: capitalize;
}

.git {
  margin-right: 7px;
}

</style>