<template>
    <div v-bind:class="classname" class="name-value" v-if="field.value">
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <input type="text"
               v-model="field.value.value"
               :name="field.propertyName + '_value'"
               :id="field.propertyName + '_value'"
               v-bind:disabled="field.disabled || field.readOnly"
               v-on="eventHandler(field, 'handleChange')"
               class="long short">
        <label v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>
<script>
    import { fieldMixin, MediakiwiTextValue } from './../form';    

    export default {
        name: 'wimNameValue',
        props: ['field', 'classname'],
        mixins: [fieldMixin],        
        methods: {
            handleChange($event) {
                console.log('triggerChange:wimNameValue');
                this.$emit('onchange', $event, this.field);
            },
            init() {
                if (this.field && !this.field.value) {
                    this.field.value = new MediakiwiTextValue("", "");
                }
            }
        },
        watch: {
            field() {
                this.init();
            }
        },
        mounted() {
            this.init();
        }
    }
</script>