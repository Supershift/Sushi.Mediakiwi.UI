<template>
    <div class="breadcrumbs" v-if="content">
        <a v-if="content.back" :href="content.back.link.href" class="button-white" v-html="content.back.link.text"></a>
        <menu class="trail">
            <li v-for="breadcrumb in content.breadcrumbItems" :key="breadcrumb.id">
                <a :href="breadcrumb.link.href" v-html="breadcrumb.link.text"></a>
            </li>
        </menu>
    </div>
</template>
<script>
    export default {
        name: 'breadcrumbs',
        props: ['content'],

    }
</script>