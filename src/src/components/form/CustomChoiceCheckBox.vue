<template>
    <div :class="checkboxContainerClasses">
        <label
          v-if="useCheckUndefined(checkbox.prefix)"
          v-html="useCheckUndefined(checkbox.prefix)" />
        <span
          v-for="option in checkbox.options"
          :key="fieldID(option)"
          class="checkbox-choice-container">
            <input type="checkbox"
                @change="handleChange"
                :class="customCheckboxClasses"
                :value="valueRef.value"
                :name="checkbox.fieldGroupName"
                :disabled="checkbox.disabled || checkbox.readOnly"
                :id="fieldID(option)" />
            <fa
                v-if="radio.fieldIcon"
                :icon="fieldIconChoice"
                class="checkbox-icon" />
            <label
              :for="checkbox.fieldGroupName"
              v-html="option.name" />
            </span>
            <label
            :for="checkbox.fieldGroupName"
            v-if="useCheckUndefined(field)"
            v-html="useCheckUndefined(field)" />
    </div>
</template>
<script lang="ts">
import useCheckUndefined from "./index";
import CheckboxModel from "../../models/CheckboxModel";
import OptionModel from "../../models/OptionModel";
import { computed, PropType } from "vue";

export default {
    name: "CheckboxChoice",
    props: {
        checkbox: {
            type: Object as PropType<CheckboxModel>,
            required: true,
        },
    },
    emits:["checkboxChanged"],
    mixins: [useCheckUndefined],
    setup(props, context) {
        function handleChange(e: Event) {
            if (props.radio.fieldValue !== null) {
                context.emit("checkboxChanged", e, props.checkbox.fieldValue);
            }
        }
        function fieldID(option: OptionModel) {
            return `${props.radio.fieldValue}_${props.radio.fieldName}_${option.value}`;
        }
        const checkboxContainerClasses = computed(() => {
        let iconColor: string;
            switch (props.checkbox.fieldIcon) {
                case "email":
                iconColor = "normal";
                break;
                case "password":
                iconColor = "alert";
                break;
                case "warning":
                iconColor = "warn";
                break;
                case "key":
                iconColor = "normal";
                break;
                case "finger":
                iconColor = "normal";
                break;
                default:
                iconColor = "normal";
                break;
            }
            return ["checkbox-container ", iconColor];
        });
        const fieldIconChoice = computed(() => {
            let icon: any;
            switch (props.checkbox.fieldIcon) {
                case "email":
                icon = ["fal", "at"];
                break;
                case "password":
                icon = ["fal", "lock-alt"];
                break;
                case "warning":
                icon = ["fal", "exclamation-triangle"];
                break;
                case "key":
                icon = ["fal", "key"];
                break;
                case "finger":
                icon = ["fal", "fingerprint"];
                break;
                default:
                icon = [""];
                break;
            }
            return icon;
        });
        return {
            checkboxContainerClasses,
            fieldIconChoice,
            fieldID,
            handleChange,
        };
    },
}
</script>