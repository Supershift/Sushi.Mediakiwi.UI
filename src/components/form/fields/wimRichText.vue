<template>
    <div :class="classname">
        <tinymce-editor v-model="field.value"
                        :name="id"
                        :id="id"
                        :init="tinymce"
                        :class="fieldClass(field)"
                        :disabled="field.disabled || field.readOnly"
                        v-on="localEventHandler('handleChange')"></tinymce-editor>
    </div>
</template>
<script>
    import { fieldMixin } from './../form';
    //import tinymce from 'tinymce/tinymce-vue';
    import Editor from '@tinymce/tinymce-vue';

    export default {
        props: ['field', 'classname'],
        mixins: [fieldMixin],
        components: {
            'tinymce-editor': Editor
        },
        data() {
            return {
                tinymce: {
                    language: this.field.locale ? this.field.locale : 'en',
                    menubar: false,
                    statusbar: false,
                    plugins: "code link",
                    toolbar: "bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code",
                }
            }
        },
        methods: {
            localEventHandler(method) {
                switch (this.field.event) {
                    case "blur":
                        this.field.event = "onBlur";                        
                }
                return this.eventHandler(this.field, method);
            },
            handleChange(editor) {
                if (this.field.event !== "none") {
                    console.log('triggerChange:tinymce');
                    this.$emit('onchange', undefined, this.field);
                }
            }
        },
        mounted() {
        },
        computed: {
            id() {
                return `${this._uid}_${this.field.propertyName}`;
            },
            value() {
                return this.field.value;
            }
        }
    }
</script>
