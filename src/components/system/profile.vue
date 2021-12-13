<template>
    <div class="channel" v-if="content">
        <h3>My profile</h3>
        <picture v-if="content.image.url" v-addwebp="{url: content.image.url, title:content.image.text}"></picture>
        <div class="content">
            <div>
                <p><strong v-html="content.username"></strong></p>
                <p v-html="content.role"></p>
            </div>
            <logout></logout>
        </div>
    </div>
</template>
<script>
    import logout from './../login/logout.vue';
    export default {
        name: 'profile',
        props: ['content'],
        components: {
            logout
        }
    }
</script> 