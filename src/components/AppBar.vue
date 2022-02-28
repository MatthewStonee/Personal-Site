<template>
  <v-app-bar
      app
      color="primary"
      dark
      hide-on-scroll
  >

    <v-toolbar-items>
      <v-btn
          text
          large
          @click="clickMethod()"
      >
          <span class="font-weight-bold">
            Home
          </span>
      </v-btn>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs" v-on="on"
              large
              text
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
            <v-list-item-title style="font-family: 'Iowan Old Style'">{{
                item.title
              }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


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
          icon: "mdi-information",
          title: "One Rep Max Calculator",
          route: "/project",
        },
        { icon: "mdi-magnify",
          title: "Simple Calculator",
          route: "/search",
        },
      ],
  }),

    methods: {
      clickMethod() {
        this.$router.push({ name: "home" }).catch(err => {console.log("Redundant Navigation, error: " + err)})
      },
    }

  };
</script>