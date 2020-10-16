<template>

    <v-layout style="height: 100%; margin-top:0; margin-bottom:0;">

            <v-row align="center" justify="center" style="height: 100%; margin-top:0; margin-bottom:0; padding-bottom: 0; padding-top:0;">

                <v-col cols="12" sm="8" md="4" style="height: 100%; margin-top:0; margin-bottom: 0; padding:0;">

                    <v-card style="height: 100%; opacity: 0.93; margin-top:0; padding-bottom: 30px;">


                        <v-card-text class="pa-10">

                            <h1 style="margin-bottom:50px; margin-top: 30px;" class="text-center"> Regisztráció </h1>

                                <v-text-field
                                    label="Felhasználónév"
                                    name="login"
                                    type="text"
                                    v-model="username"
                                    :rules="[v => !!v || 'Felhasználónév megadása kötelező!']"
                                    prepend-inner-icon="person"
                                    rounded
                                    outlined
                                />

                                <v-text-field
                                    label="E-mail cím"
                                    name="email"
                                    type="text"
                                    v-model="email"
                                    :rules="[v => emailValid(email) || 'E-mail cím formátuma nem megfelelő!']"
                                    prepend-inner-icon="alternate_email" rounded outlined
                                />

                                <v-text-field
                                    id="password"
                                    label="Jelszó"
                                    name="password"
                                    type="password"
                                    v-model="password"
                                    :rules="[v => !!v || 'Jelszó megadása kötelező']"
                                    prepend-inner-icon="lock" rounded outlined
                                />

                                <v-text-field
                                    id="password"
                                    label="Jelszó megerősítése"
                                    name="password"
                                    type="password"
                                    v-model="passwordAgain"
                                    :rules="[v => !!v || 'Jelszó hossza legalább 5 karakter', v => v === password || 'A két jelszó nem egyezik!']"
                                    prepend-inner-icon="lock" rounded outlined
                                />

                            <div class="text-center pa-5 ma-5">

                                <v-btn x-large outlined rounded :disabled="!formValid" @click="register()" color="primary">Regisztráció  </v-btn>

                            </div>

                        </v-card-text>

                    </v-card>

                </v-col>

            </v-row>

    </v-layout>

</template>

<script>
import {registrationService} from "@/services/RegistrationService";

export default {
    name: "Register",
    data() {
        return {
            username: null,
            password: null,
            email: null,
            passwordAgain: null,
        }
    },
    computed: {
        formValid() {
            return this.password?.length > 5
                && this.password === this.passwordAgain
                && this.username?.length > 5
                && this.emailValid(this.email)
        }
    },
    methods: {
        register() {
            registrationService.register(this.username, this.password).then(response => {
                this.$store.commit('setUser', {
                    username: response.data.loginNev,
                    name: response.data.nev,
                    id: response.data.id
                });
                this.$router.push('/')
            })
        },
        emailValid(email) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
        },
    }
}
</script>

<style scoped>

</style>