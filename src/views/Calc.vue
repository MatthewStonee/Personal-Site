<template>
  <v-container>
    <CalcComponent />
  </v-container>
</template>

<script>
  import CalcComponent from "@/components/CalcComponent.vue";

  export default {

    name: 'Calculator',

    created() {
      document.title = "Calculator"
    },

    components: {CalcComponent}
  }


</script>

