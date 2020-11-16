<template>

    <v-layout row class="bg" style="height: 100%; margin-top:0; margin-bottom:0;">

        <v-row align="center" justify="center">

            <v-col cols="12" sm="8" md="4">

                <v-card  class="elevation-12 login" >

                    <v-card-text class="pa-10">

                        <h1 style="margin-bottom:50px; margin-top: 30px;" class="text-center"> Bejelentkezés </h1>

                        <v-text-field
                                label="E-mail cím"
                                name="login"
                                type="text"
                                v-model="email"
                                rounded
                                outlined
                                :rules="[v => !!v || 'Felhasználónév legalább 5 karakter hosszú!']"
                            />


                            <v-text-field
                                id="password"
                                label="Jelszó"
                                name="password"
                                type="password"
                                rounded
                                outlined
                                v-model="password"
                                :rules="[v => !!v || 'Jelszó hossza legalább 5 karakter']"
                            />

                        <div class="text-center pa-5 ma-5">


                            <v-btn @click="login()"
                                   rounded
                                   outlined
                                   x-large
                                   :disabled="!email || !password"
                                   color="primary">Bejelentkezés
                            </v-btn>
                        </div>

                    </v-card-text>

                    <v-card-actions>

                        <v-spacer />


                    </v-card-actions>

                </v-card>

            </v-col>

        </v-row>

    </v-layout>

</template>

<script>
import { loginService } from "@/services/LoginService";

export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
        }
    },

    methods: {
        login() {
            loginService.login({
                email: this.email,
                password: this.password
            }).then(response => {
                this.$store.commit('setUser', {
                    email: response.data.loginNev,
                    name: response.data.nev,
                    id: response.data.id
                });
                this.$router.push('/familytree')
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
.bg {
    background: url("../../assets/2afdd997f68575669640c947104dee2a.jpg");
    background-size: 100%;
}
</style>