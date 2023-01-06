<template>
  <div class="about">
    <h1>This the AI page!</h1>
    <v-btn
        @click="generateText"
        large
        color="blue"
        class="white--text btn"
    >
      GENERATE!
    </v-btn>
  </div>
</template>

<style>

</style>

<script>

  import axios from "axios";

  export default {

    data() {
      return {
        apiKey: process.env.VUE_APP_OPENAI_KEY,
      }
    },

    methods: {
      async generateText() {
        console.log("Api key is " + this.apiKey);
        try {
          const response = await axios({
            method: 'post',
            url: 'https://api.openai.com/v1/text_generations',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_KEY}`
            },
            data: {
              "engine": "text-davinci-002",
              "prompt": "What is the meaning of life?",
              "max_tokens": 2048,
              "stop": "."
            }
          });
          console.log(response.data.text);
        } catch (error) {
          console.error(error);
        }
      }
    },

  }
</script>