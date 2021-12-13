<template>
    <section class="iconbar" v-if="buttons">

        <ul>
            <li v-for="button of buttons" :class="getPositionClass(button)">              
                <wimButton :field="button" @onclick="onclick"></wimButton>
            </li>
        </ul>
    </section>
</template>
<script>
    import { MediakiwiButton } from './../form/form';
    import wimButton from './../form/fields/wimButton.vue';

    export default {
        name: 'icon-bar',
        props: ['buttons'],
        components: {
            wimButton
        },
        methods: {
            onclick($event, field) {
                this.$emit('onclick', $event, field)
            },
            getPositionClass(button) {
                if (!button)
                    return;

                return button.expression == 2 ? "right" : "";
            }
        },
        mounted() {
        }
    }
</script>