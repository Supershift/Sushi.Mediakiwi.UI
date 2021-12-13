<template>
    <div :class="fieldClass(field)" >
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <treeselect v-model="field.value"
                    :multiple="true"
                    :options="treeselectData"
                    @input="handleChange"/>
        <label v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>
<script>
    import { fieldMixin } from './../form';
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        components: {
            Treeselect
        },
        methods: {
            handleChange($event) {
                console.log('triggerChange:wimTreeselect');
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
            treeselectData() {
                if (!this.field || !this.field.options || !this.field.options.length)
                    return undefined;

                return this.field.options.map((r) => {
                    return {
                        id: r.id,
                        label: r.label,
                        disabled: (typeof (r.disabled) !== "undefined" && r.disabled) ? r.disabled : false,
                        children: r.children ? r.children : undefined,
                    };
                });
            }
        }
    }
</script>
