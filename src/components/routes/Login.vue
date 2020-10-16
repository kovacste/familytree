<template>
    <v-layout row>

        <v-container class="fill-height" fluid>

            <v-row align="center" justify="center">

                <v-col cols="12" sm="8" md="4">

                    <v-card  class="elevation-12 login" >

                        <v-toolbar color="primary" dark flat>

                            <v-toolbar-title> Bejelentkezés  </v-toolbar-title>

                        </v-toolbar>

                        <v-card-text>

                            <v-form>

                                <v-text-field
                                    label="Felhasználónév"
                                    name="login"
                                    type="text"
                                    v-model="username"
                                    :rules="[v => v.length > 5 || 'Felhasználónév legalább 5 karakter hosszú!']"
                                />


                                <v-text-field
                                    id="password"
                                    label="Jelszó"
                                    name="password"
                                    type="password"
                                    v-model="password"
                                    :rules="[v => v.length > 5 || 'Jelszó hossza legalább 5 karakter']"
                                />

                            </v-form>

                        </v-card-text>

                        <v-card-actions>

                            <v-spacer />

                            <v-btn @click="login()" color="primary">Bejelentkezés  </v-btn>

                            <v-btn @click="toRegistration()" color="primary">Regisztráció  </v-btn>

                        </v-card-actions>

                    </v-card>

                </v-col>

            </v-row>

        </v-container>

    </v-layout>

</template>

<script>
import {loginService} from "@/services/LoginService";

export default {
    name: "Login",
    data() {
        return {
            username: null,
            password: null,
        }
    },

    methods: {
        login() {
            loginService.login(this.username, this.password).then(response => {
                this.$store.commit('setUser', {
                    username: response.data.loginNev,
                    name: response.data.nev,
                    id: response.data.id
                });
                this.$router.push('/')
            })
        },
        toRegistration() {
            this.$router.push('/registration')
        }
    }
}
</script>

<style scoped>
.login {
    opacity: 0.5;
}
</style>