<template>
  <v-app id="grad">
    <AppBar></AppBar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
#grad {
  background-color: rgb(28, 28, 33);
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

</style>

<script>
import AppBar from "./components/AppBar.vue";
export default {
  name: "App",

  created() {
    document.title = "Home";
  },

  components: {AppBar}
}


</script>
