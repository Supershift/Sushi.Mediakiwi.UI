<template>
  <div :class="checkboxContainerClasses">
    <label v-if="undefinedCheck(checkbox.prefix)">
      {{ undefinedCheck(checkbox.prefix) }}
    </label>
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
      <span class="checkmark" />
      <fa
        v-if="checkbox.fieldIcon"
        :icon="fieldIconChoice"
        class="checkbox-icon"
      />
      <label :for="checkbox.fieldGroupName">
        {{ option.name }}
      </label>
    </span>
    <label
      v-if="undefinedCheck(checkbox.suffix)"
      :for="checkbox.fieldGroupName">
      {{ undefinedCheck(checkbox.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import { useCheckUndefined } from "./index";
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
    const customCheckboxClasses = computed(() => ["checkbox-primary ", props.checkbox.customClass]);
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
      customCheckboxClasses,
      fieldIconChoice,
      valueRef,
      fieldID,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
.checkbox-container {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: $font-primary;
  font-size: $font-size-l;
  margin: 15px 0;
  input {
    position: absolute;
    opacity: 0;
    z-index: 30;
    height: 100%;
    width: 100%;
    margin: 0;
    cursor: pointer;
  }
  .checkmark {
    position: absolute;
    top: 15px;
    left: 0;
    height: 25px;
    width: 25px;
    background: #eee;
    border-radius: 6px;
    z-index: 20;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
  .checkbox-choice-container {
    position: relative;
    display: flex;
    flex-direction: row;
    &:hover {
      input ~ .checkmark {
          background: $color-blue;
        }
    }
    input:checked ~ .checkmark  {
      background: $color-blue;
    }
    label {
      padding: 15px;
      padding-left: 35px ;
    }
    .checkmark{
      &:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }
    }
  }
  .normal {
    .checkbox-icon {
        color: $color-blue;
    }
  }
  .alert {
    .checkbox-icon {
        color: $color-alert;
    }
  }
}
</style>