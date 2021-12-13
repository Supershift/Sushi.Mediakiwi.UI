<template>
    <a v-bind:class="classname" 
       class="plusBtn fas fa-plus"
       :id="field.propertyName + '_plus'" @click="click($event)"></a>
</template>
<script>
    import { fieldMixin } from './../form';

    export default {
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        data() {
            return {
                value: "",
            }
        },
        methods: {
            //valueChanged($event) {
            //    console.log('triggerChange:wimPlus');
            //    this.$parent.postFields($event);                
            //},
            //addSection($event) {
            //    // what element to add
            //    this.$parent.addFields($event, this.field); 
            //},
            click($event) {
                this.$emit('click');
            }
        },
        mounted() {
            this.value = this.field.value;
        },
        computed: {
            isHalf() {
                return this.field.expression !== this.outputExpression.FullWidth;
            },
            id() {
                return this.field.propertyName;
            },
        }
    }
</script>
