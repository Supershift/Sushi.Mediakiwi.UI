<template>
  <div :class="checkboxContainerClasses">
    <label
      v-if="undefinedCheck(checkbox.prefix)"
      v-html="undefinedCheck(checkbox.prefix)"
    />
    <span
      v-for="option in checkbox.options"
      :key="fieldID(option)"
      class="checkbox-choice-container"
    >
      <input
        :id="fieldID(option)"
        type="checkbox"
        :name="checkbox.fieldGroupName"
        :class="customCheckboxClasses"
        :value="valueRef.value"
        :disabled="checkbox.disabled || checkbox.readOnly"
        @change="handleChange"
      >
      <fa
        v-if="checkbox.fieldIcon"
        :icon="fieldIconChoice"
        class="checkbox-icon"
      />
      <label
        :for="checkbox.fieldGroupName"
        v-html="option.name"
      />
    </span>
    <label
      v-if="undefinedCheck(checkbox.suffix)"
      :for="checkbox.fieldGroupName"
      v-html="undefinedCheck(checkbox.suffix)"
    />
  </div>
</template>
<script lang="ts">
import useCheckUndefined from "./index";
import CheckboxModel from "../../models/CheckboxModel";
import OptionModel from "../../models/OptionModel";
import { computed, defineComponent, PropType, reactive } from "vue";

export default defineComponent({
  name: "CheckboxChoice",
  mixins: [useCheckUndefined],
  props: {
    checkbox: {
      type: Object as PropType<CheckboxModel>,
      required: true,
    },
  },
  emits:["checkboxChanged"],
  setup(props, context) {
    const valueRef = reactive({value: ""});
    function handleChange(e: Event) {
      if (props.checkbox.fieldValue !== null) {
        context.emit("checkboxChanged", e, props.checkbox.fieldValue);
      }
    }
    function fieldID(option: OptionModel) {
      return `${props.checkbox.fieldValue}_${props.checkbox.fieldName}_${option.value}`;
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
      let icon: string[];
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
      valueRef,
      fieldID,
      handleChange,
    };
  },
});
</script>