<template>
    <div :class="classname">
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <select2
            v-model="localField.value"
            tabindex="-1"
            :name="field.propertyName"
            :id="field.propertyName"
            :value="field.value"
            :options="select2data"
            :settings="select2Settings"
            :class="fieldClass(field)"
            :disabled="field.disabled || field.readOnly"
            ref="dropdown"
            @change="handleChange"
        >
        </select2>
        <label v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>
<script>
import { fieldMixin } from "./../form";
import Select2 from "v-select2-component";
import { parseIntWithBase } from "./../../../utils/utils";

export default {
    props: {
        field: {
            type: Object,
            required: false,
        },
        classname: {
            type: String,
            required: false,
        },
    },
    mixins: [fieldMixin],
    components: {
        Select2,
    },
    computed: {
        select2data() {
            if (!this.localField || !this.localField.options || !this.localField.options.length) {
                return [];
            }

            return this.localField.options.map((r) => {
                return {
                    id: r.value,
                    text: r.text,
                    disabled: typeof r.disabled !== "undefined" && r.disabled ? r.disabled : false,
                };
            });
        },
    },
    data() {
        return {
            localField: null,
            select2Settings: {
                width: "100%",
                placeholder: "",
                allowClear: true,
            },
        };
    },
    methods: {
        handleChange() {
            if (this.localField.event !== "none") {
                this.localField.value = isNaN(this.localField.value) ? this.localField.value : parseIntWithBase(this.localField.value);
                this.$emit("onchange", null, this.localField);
            }
        },
    },
    created() {
        this.localField = this.field;
    },
    destroyed() {},
};
</script>
