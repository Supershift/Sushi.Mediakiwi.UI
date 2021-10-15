<template>
    <div :class="classname">        
        <label v-if="undefinedCheck(field)" v-html="undefinedCheck(field)"></label>
        <span v-for="option in field.options" :key="fieldID(option)">
            <input type="radio"
                @change="handleChange"
                :value="inputText"
                :class="customRadioClasses"
                :name="field.groupName"
                :disabled="field.disabled"
                :id="fieldID(option)" />
            <label :for="fieldID(option)" v-html="option.name"></label>
        </span>
        <label v-if="undefinedCheck(field)" v-html="undefinedCheck(field)"></label>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from "vue";
import useCheckUndefined from "./index";
import RadioModel from "../../models/RadioModel";

export default defineComponent({
    props: {
        radio: {
            type: Object as PropType<RadioModel>,
            required: true,
        },
    },
    mixins: [useCheckUndefined],
    setup(props, context) {
        onMounted(() => {
                if (typeof (props.radio.fieldValue) === "string") {
                if (props.radio.fieldValue.toLowerCase() === "false") {
                    props.radio.fieldValue = "0";
                }
                else if (props.radio.fieldValue.toLowerCase() === "true") {
                    props.radio.fieldValue = "1";
                }
            }
        });
        const customRadioClasses = computed(() => ['radio-primary ', props.radio.customClass]);
        const inputText = reactive<String>('');
        function handleChange($event) {
            if (props.radio.fieldValue !== null) {
                context.emit('radioChanged', $event, props.radio.fieldValue);
            }
        }
        function fieldID(option) {
            return `${this._uid}_${this.field.propertyName}_${option.value}`;
        }
        return {
            fieldID,
            inputText,
            handleChange,
            customRadioClasses,
        };
    },
})
</script>

<style scoped lang="scss"></style>