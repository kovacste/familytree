<template>

  <div id="app">

      <v-app id="form">

          <v-main>

              <router-view />

          </v-main>

      </v-app>

  </div>

</template>

<script>
export default {
    computed: {
        hasLoggedInUser() {
            return !!this.$store.getters.user
        }
    },
    name: 'App',
    mounted() {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style>
.avatar {
    display: inline;
}
#container {
    position: absolute;
    z-index: 9;
    text-align: center;
    top: 30%;
    width: 1000px;
    height: 1000px;
    left: 30%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.content {
    margin-left: 256px;
}
#form {

}
</style>
