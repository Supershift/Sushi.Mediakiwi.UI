<template>
    <div :class="fieldClass(field)">
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <section class="name-value-collection" v-for="(nameValue, index) of field.value">
            <wimValue :field="getField(nameValue, index)" @onchange="handleChange"></wimValue>
            <i class="delete far fa-times" @click="removeNameValuePair(nameValue)"></i>
        </section>
        <wimPlus :field="plusField" @click="addNameValuePair" classname="small"></wimPlus>
        <label v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>
<script>
    import { fieldMixin, MediakiwiField, FieldType, MediakiwiValue } from './../form';
    import wimPlus from './wimPlus.vue';
    import wimValue from './wimValue.vue';

    export default {
        name: 'wimValueCollection',
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        components: {
            wimPlus,
            wimValue
        },
        computed: {
            plusField() {
                return new MediakiwiField(FieldType.wimPlus, '', this.field.propertyName);
            },
        },
        watch: {
            field() {
                this.init();
            }
        },
        methods: {
            getField(nameValue, index) {
                let field = Object.assign({}, this.field);
                field.type = FieldType.wimValue
                field.propertyName = `${this.field.propertyName}_${index}`;
                field.value = nameValue;
                field.event = this.field.event;
                return field;
            },
            handleChange($event) {
                console.log('triggerChange:wimValueCollection');
                this.$emit('onchange', $event, this.field);
            },
            addNameValuePair() {
                this.field.value.push(new MediakiwiValue());
            },
            removeNameValuePair(nameValuePair) {
                let index = this.field.value.findIndex(r => r.text === nameValuePair.text && r.value === nameValuePair.value);
                this.field.value.splice(index, 1);
            },
            init() {
                if (!this.field.value) {
                    this.field.value = [];
                    this.addNameValuePair();
                }
            }
        },
        mounted() {
            this.init();            
        }
    }
</script>