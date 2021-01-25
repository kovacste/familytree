<template>

    <v-layout class="bg" style="height: 100%; margin-top:0; margin-bottom:0;">

            <v-row align="center" justify="center" style="height: 100%; margin-top:0; margin-bottom:0; padding-bottom: 0; padding-top:0;">

                <v-col cols="12" sm="8" md="4" style="height: 100%; margin-top:0; margin-bottom: 0; padding:0;">

                    <v-card style="height: 100%; opacity: 0.93; margin-top:0; padding-bottom: 30px;">

                        <v-card-text class="pa-10">

                            <h1 style="margin-bottom:50px; margin-top: 30px;" class="text-center"> Regisztráció </h1>

                                <v-text-field
                                    label="Vezetéknév"
                                    name="login"
                                    type="text"
                                    v-model="lastname"
                                    :rules="[v => !!v || 'Vezetéknév megadása kötelező!']"
                                    prepend-inner-icon="person"
                                    rounded
                                    outlined
                                />

                                <v-text-field
                                    label="Keresztnév"
                                    name="login"
                                    type="text"
                                    v-model="firstname"
                                    :rules="[v => !!v || 'Keresztnév megadása kötelező!']"
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
                                    prepend-inner-icon="alternate_email"
                                    rounded
                                    outlined
                                />

                                <v-text-field
                                    label="Születési hely"
                                    name="birthplace"
                                    type="text"
                                    v-model="birthplace"
                                    :rules="[v => !!v || 'Adja meg a születési helyét!!']"
                                    rounded
                                    outlined
                                />

                                <v-text-field
                                    label="Születési idő"
                                    name="birthplace"
                                    type="text"
                                    v-model="birthday"
                                    :rules="[v => !!v || 'Adja meg a születési helyét!!']"
                                    rounded
                                    outlined
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


                                <v-text-field
                                    id="password"
                                    label="Jelszó megerősítése"
                                    name="password"
                                    type="password"
                                    v-model="passwordAgain"
                                    :rules="[v => !!v || 'Jelszó hossza legalább 5 karakter', v => v === password || 'A két jelszó nem egyezik!']"
                                    prepend-inner-icon="lock" rounded outlined
                                />

                                <v-text-field
                                    id="imageurl"
                                    label="Profilkép"
                                    name="imageurl"
                                    v-model="imageUrl"
                                    rounded outlined
                                />

                            <div class="text-center pa-5 ma-5">

                                <v-btn x-large outlined rounded :disabled="!formValid" @click="register()" color="primary">Regisztráció  </v-btn>

                                <br>
                                <span style="cursor:pointer;" @click="toLogin()"><u>Bejelentkezés</u></span>

                            </div>

                        </v-card-text>

                    </v-card>

                </v-col>

            </v-row>

    </v-layout>

</template>

<script>
import { registrationService } from '@/services/RegistrationService.js';

export default {
    name: "Register",
    data() {
        return {
            firstname: null,
            lastname: null,
            birthplace: null,
            birthday: "1992-07-24T19:46:30.130Z",
            password: null,
            email: null,
            passwordAgain: null,
            imageUrl: null,
        }
    },
    computed: {
        formValid() {
            return this.password?.length > 2
                && this.password === this.passwordAgain
                && this.firstname?.length > 2
                && this.lastname?.length > 2
                && this.birthplace?.length > 2
                && this.emailValid(this.email)
        }
    },
    methods: {
        toLogin() {
            this.$router.push('/login')
        },
        register() {
            registrationService.register(
                {
                    id: 0,
                    email: this.email,
                    password: this.password,
                    firstName: this.firstname,
                    lastName: this.lastname,
                    birthDay: new Date(this.birthday).toISOString(),
                    birthPlace: this.birthplace,
                    imageUrl: this.imageUrl,
                }
            ).then(() => {
                this.$router.push('/login')
            }).catch(error => {
                console.log(error)
            })
        },
        emailValid(email) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
        },
    }
}
</script>

<style scoped>
.bg {
    background: url("../../assets/2afdd997f68575669640c947104dee2a.jpg");
    background-size: 100%;
}
</style>