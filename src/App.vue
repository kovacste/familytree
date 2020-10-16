<template>

  <div id="app">

      <v-app id="form">

          <v-navigation-drawer v-if="hasLoggedInUser" style="position: fixed;" absolute permanent left dark>

              <template v-slot:prepend>

                  <v-list-item two-line>

                      <v-list-item-avatar>

                          <v-icon>mdi-account-circle</v-icon>

                      </v-list-item-avatar>

                      <v-list-item-content>

                          <v-list-item-title>Name </v-list-item-title>

                      </v-list-item-content>

                      <v-list-item-subtitle>Bejelentkezve</v-list-item-subtitle>

                  </v-list-item>

              </template>

              <v-divider />

              <v-list dense>

                  <h4 class="subtitle-2"> </h4>

                  <v-list-group>

                      <template v-slot:activator>

                          <v-list-item-content>

                              <v-list-item-title> cucc </v-list-item-title>

                          </v-list-item-content>

                      </template>

                      <v-list-item>

                          <v-list-item-title> Cucccc </v-list-item-title>

                      </v-list-item>

                  </v-list-group>

              </v-list>

          </v-navigation-drawer>


          <v-content>

              <router-view />

          </v-content>
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
    background: url("assets/2afdd997f68575669640c947104dee2a.jpg");
    background-size: 100%;
}
</style>
