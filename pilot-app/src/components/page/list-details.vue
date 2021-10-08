<template>
    <section class="list-details" v-if="content">
        <h1 v-html="content.listTitle"></h1>
        <ul class="icons" v-if="content.iconsLinks && content.iconsLinks.length">
            <li v-for="iconLink of content.iconsLinks" :key="iconLink.id">
                <a :href="iconLink.link.href" v-bind:class="iconLink.className" :target="iconLink.link.target"></a>
            </li>

        </ul>
    </section>
</template>
<script>
    export default {
        name: 'list-details',
        props: ['content'],
    }
</script>