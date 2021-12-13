<template>
    <form class="login" @submit.prevent="next">
        <h1>Forgot my password</h1>
        <p>Please enter your email adress below and we'll send you instructions on how to reset your password.</p>
        <notification v-if="notifications" :notifications="notifications"></notification>
        <input required v-model="email" type="email" placeholder="Email" />
        <button class="button-primary right" type="submit">Next</button>
        <a href="#/login">Return to the login</a>
    </form>
</template>
<script>
    import axios from 'axios';
    import { origin } from './../../utils/shared';
    import { MediakiwiNotification } from './../form/form'
    import notification from './../form/notifications.vue';

    export default {
        name: 'forgot-component',
        components: {
            notification
        },
        data() {
            return {
                email: "",
                notifications: undefined,
            }
        },
        methods: {
            next: function () {
                let data = {
                    email: this.email,
                }

                axios({ url: `${origin()}/api/auth/forgot`, data: data, method: 'POST' })
                    .then(resp => {
                        this.notifications = resp.data.notifications;
                    })
                    .catch(resp => {
                        if (resp.response) {
                            let error = new MediakiwiNotification(resp.response.data.message, true);
                            this.notifications = [error];
                        }
                    })
            },
        },
    }
</script>