<template>
    <div :class="classname">        
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <span v-for="option in field.options" :key="fieldID(option)">
            <input type="radio"
                   v-on="eventHandler(field, 'handleChange')"
                   v-model="field.value"
                   class="radio"
                   v-bind:class="errorClass(field)"
                   :name="field.groupName"
                   :value="option.value"
                   v-bind:disabled="field.disabled || field.readOnly"
                   :id="fieldID(option)" />
            <label :for="fieldID(option)" v-html="option.text"></label>
        </span>
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
                console.log('triggerChange:radio');
                if (this.field.event !== 'none') {
                    this.$emit('onchange', $event, this.field);
                }
            },
            fieldID(option) {
                return `${this._uid}_${this.field.propertyName}_${option.value}`;
            },
            init() {
                // custom
                if (typeof (this.field.value) === "string") {
                    if (this.field.value.toLowerCase() === "false") {
                        this.field.value = 0;
                    }
                    else if (this.field.value.toLowerCase() === "true") {
                        this.field.value = 1;
                    }
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
        },
        computed: {
            id() {
                return this.field.propertyName;
            },
        }
    }
</script>