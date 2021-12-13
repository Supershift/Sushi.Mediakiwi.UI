<template>
    <div :class="classname">
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <input type="checkbox"
               v-on="eventHandler(field, 'handleChange')"
               class="radio"
               v-bind:class="fieldClass(field)"
               v-model="field.value"
               :name="field.propertyName"
               v-bind:disabled="field.disabled || field.readOnly"
               :id="field.propertyName">
        <label :for="field.propertyName" v-html="field.inputPost"></label>
        <label :for="field.propertyName" v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>
<script>
    import { fieldMixin } from './../form';

    export default {
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        methods: {
            handleChange($event) {
                console.log('triggerChange:checkbox');
                this.$emit('onchange', $event, this.field);
            }
        },
        mounted() {
        },
        computed: {
            id() {
                return this.field.propertyName;
            },
        }
    }
</script>