<template>
    <form class="login" @submit.prevent="login">
        <h1>Sign in with your email</h1>
        <notification v-if="notifications" :notifications="notifications"></notification>

        <input required v-model="email" type="email" placeholder="Email" />
        <input required v-model="password" type="password" placeholder="Password" />
        <button class="button-primary right" type="submit">Login</button>
        <a href="#/forgot">Forgot password</a>
        <a href="#/reset">Reset password</a>
    </form>
</template>
<script>
    import notification from './../form/notifications.vue';
    import { MediakiwiNotification } from './../form/form';

    export default {
        name: 'login-component',
        components: {
            notification
        },
        data() {
            return {
                email: "",
                password: "",
                notifications: undefined,
            }
        },
        methods: {
            login: function () {
                let data = {
                    email: this.email,
                    password: this.password,
                }
                this.$store.dispatch('login', data)
                    .then(() => this.$router.push("/home"))
                    .catch(err => {
                        if (err.response && err.response.data) {
                            let notification = new MediakiwiNotification(err.response.data.message, true)
                            this.notifications = [notification];
                        }
                        else {
                            console.error(err);
                        }
                    });
            },
        },
    }
</script>