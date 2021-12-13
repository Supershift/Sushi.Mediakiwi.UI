<template>
    <div :class="classname">
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <input type="text"
               v-model="model"
               v-on="eventHandler(field, 'handleChange')"
               :class="fieldClass(field)"
               :name="field.propertyName"
               :id="field.propertyName"
               v-bind:disabled="field.disabled || field.readOnly">
        <label v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>
<script>
    import { fieldMixin } from './../form';

    export default {
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        methods: {
            handleChange($event) {
                console.log('triggerChange:wimText');
                this.$emit('onchange', $event, this.field);
            }
        },
        watch: {
            model(value) {
                this.field.value = value;
            }
        },
        mounted() {
            this.model = this.field.value;
            if (this.field.event === "change") {
                this.modelWatch = this.$watch(() => { return this.model }, () => {
                    this.handleChange(undefined);
                });
            }
        },
        data() {
            return {
                modelWatch: undefined,
                model: undefined,
            }
        },
        computed: {
            id() {
                return this.field.propertyName;
            },
        }
    }
</script>
