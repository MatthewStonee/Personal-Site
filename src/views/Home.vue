<template>
  <div class="header">
    <div class="intro">
      <div>
        <h1>Hi 👋 I’m Matthew Stone!</h1>
        <h2>I’m a Computer Science graduate from the University of Central Florida and currently a Senior Systems Engineer for CPE ST3, looking to further my knowledge in everything tech!</h2>
      </div>


      <div class="container-1">
        <div class="Exp">
          <p>🎓B.S. Computer Science @ University of Central Florida</p>
          <p class="p2">📍 Grew up in Florida</p>
          <p>💪 Love to workout, game, and trade stocks</p>
          <p class="p2">💻️ There are some simple web apps on this website that I built while learning different aspects of Vue.js and web development!</p>
        </div>

        <div class="image">
          <v-sheet
              color="grey-lighten-1"
              rounded
              elevation="8"
              max-width="420"
          >
            <v-img :src="images.profile" width="100%" aspect-ratio="1"></v-img>
          </v-sheet>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

.intro {
  width: 100%;
  padding: 24px;
  max-width: 815px;
  text-align: left;
  font-family: Prompt, sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

h1 {
  color: white;
  margin-bottom: 25px;
  font-size: 45px;
}

h2{
  color:white;
  font-size: 19px;
  font-weight: 400;
  line-height: 1.65;
  margin-bottom: 20px;
}

p{
  color:white;
  font-size: 17px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
}
.p2 {
  color:white;
  font-size: 17px;
  margin-top: 10px;
  text-align: left;
}

.container-1 {
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
}

.Exp {
  flex: 1;
}

.image {
  flex: 1;
}

@media (min-width: 700px) {
  .container-1 {
    flex-direction: row;
    align-items: center;
    gap: 0;
  }
  .Exp {
    padding-right: 35px;
  }
  .intro {
    padding: 45px;
  }
}

</style>

<script>
import profileImg from '../images/profile3.jpg'

export default {
  name: 'Home',

  components: {
  },

  created() {
    document.title = "Home";
  },

  data() {
    return {
      images: {
        profile: profileImg,
      }
    }
  },



};
</script>
