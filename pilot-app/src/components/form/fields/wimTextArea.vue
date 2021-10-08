<template>
    <div :class="classname">
        <textarea cols="32"
                  rows="3"
                  type="text"
                  v-model="field.value"
                  v-on="eventHandler(field, 'handleChange')"
                  :class="fieldClass(field)"
                  :name="field.propertyName"
                  :id="field.propertyName"
                  v-bind:disabled="field.disabled || field.readOnly"
                  ref="textArea">{{field.value}}</textarea>
    </div>
</template>
<script>
    import { fieldMixin } from './../form';

    export default {
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        data() {
            return {
                offset: undefined,
            }
        },
        methods: {
            handleChange($event) {
                console.log('triggerChange:textarea');
                this.$emit('onchange', $event, this.field);
            },
            autoResize(element) {
                element.style.height = 'auto';
                element.style.height = element.scrollHeight + this.offset + 'px';
            },
        },
        mounted() {
            // get the element
            let element = this.$refs.textArea;
            // set original offset
            this.offset = element.offsetHeight - element.clientHeight;
            // add event listener for the the content changes
            element.addEventListener('input', (event) => this.autoResize(event.target));
            // set the size for the inital state
            this.autoResize(element);
        },
        computed: {
            id() {
                return this.field.propertyName;
            },
        }
    }
</script>
