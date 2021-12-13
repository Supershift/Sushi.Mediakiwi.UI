<template>
    <form class="login" @submit.prevent="next">
        <h1>Reset my password</h1>
        <p>
            Your password needs to be (re)applied.<br />
            Apply a minimum of 8 characters in length which should contain one of every character type: Uppercase, lowercase, number & symbol.
        </p>
        <notification v-if="notifications" :notifications="notifications"></notification>
        <input required v-model="email" type="email" placeholder="Email" readonly="readonly" />
        <input required v-model="password" type="password" placeholder="Password" />
        <input required v-model="password2" type="password" placeholder="Repeat password" />
        <button class="button-primary right" type="submit">Next</button>
        <a href="#/login">Return to the login</a>
    </form>
</template>
<script>
    import axios from 'axios'
    import { origin } from './../../utils/shared'
    import { MediakiwiNotification } from './../form/form'
    import notification from './../form/notifications.vue';

    export default {
        name: 'reset-component',
        components: {
            notification
        },
        data() {
            return {
                email: typeof (email) !== "undefined" ? email : undefined,
                password: "",
                password2: "",
                notifications: undefined,
            }
        },
        methods: {
            next: function () {
                let data = {
                    email: this.email,
                    password: this.password,
                    passwordRepeat: this.password2,
                }

                axios({ url: `${origin()}/api/auth/reset`, data: data, method: 'POST' })
                    .then(resp => {
                        this.notifications = resp.data.notifications;
                    })
                    .catch(resp => {
                        if (resp.response) {
                            let error = new MediakiwiNotification(resp.response.data.message, true);
                            this.notifications = [error];
                        }
                    });
            },
        },
    }
</script>