<template>
  <v-app>
    <AppBar></AppBar>
    <v-main id="grad">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
#grad {
  /*background-image: linear-gradient(dodgerblue, lightsteelblue);*/
  background-color: rgba(2,2,6,0.75);
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

  components: {AppBar}
}


</script>
