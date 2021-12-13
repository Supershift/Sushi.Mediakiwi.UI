<template>
    <div>
        <button type="button" class="button-primary" @click="logout">Logout</button>
    </div>
</template>
<script>
    export default {
        name: 'logout-component',       
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => this.$router.push("/login"))
                    .catch(err => console.log(err))
            }
        },
    }
</script>