<template>
    <wimDateTime :field="field" :classname="classname" type="date" @onchange="onchange"></wimDateTime>
</template>
<script>
    import wimDateTime from './wimDateTime.vue'

    export default {
        name: 'wimDate',
        props: ['field', 'classname'],
        components: {
            wimDateTime 
        },
        methods: {
            onchange($event, field) {
                this.$emit('onchange', $event, field);
            }
        },
    }
</script>