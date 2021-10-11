<template>
    <section class="component explorer" v-if="content">
        <div class="widget" v-for="folder of content" :key="folder.id">
            <h2>
                <a :href="folder.folder.link.href" v-html="folder.folder.link.text"></a>
            </h2>
            <ul>
                <li v-for="listItem in folder.listItems">
                    <a :href="listItem.link.href" v-html="listItem.link.text" :title="listItem.link.text"></a>                    
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'explorer',
        props: ['content'],
        methods: {
            random() {
                return Math.floor(Math.random() * 10) + 1;
            }
        }
    }
</script>