<template>
  <div :class="checkboxContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <span
      v-for="option in field.options"
      :key="fieldID(option)"
      class="checkbox-choice-container">
      <input
        :id="fieldID(option)"
        type="checkbox"
        :name="field.fieldGroupName"
        :class="customCheckboxClasses"
        :value="valueRef.value"
        :disabled="
          field.disabled || field.isReadOnly
        "
        @change="handleChange" />
      <span class="checkmark" />
      <!-- eslint-disable-next-line vue/no-unregistered-components -->
      <fa
        v-if="field.fieldIcon"
        :icon="fieldIconChoice"
        class="checkbox-icon" />
      <label :for="field.fieldGroupName">
        {{ option.name }}
      </label>
    </span>
    <label v-if="undefinedCheck(field.suffix)">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import {fieldMixins} from "../form/index";
import {ILocalCheckbox, ILocalOption} from "../../models/Local/Interfaces";
import {
  computed,
  defineComponent,
  PropType,
  reactive,
} from "vue";

export default defineComponent({
  name: "CheckboxChoice",
  props: {
    field: {
      type: Object as PropType<ILocalCheckbox>,
      required: true,
    },
  },
  mixins: [fieldMixins],
  emits: ["checkbox-changed"],
  setup(props, context) {
    const valueRef = reactive({value: ""});
    const customCheckboxClasses = computed(() => [
      "checkbox-primary ",
      props.field.customClass,
    ]);
    function handleChange(e: Event) {
      if (props.field.fieldValue !== null) {
        context.emit(
          "checkbox-changed",
          e,
          props.field.fieldValue
        );
      }
    }
    function fieldID(option: ILocalOption) {
      return `${props.field.fieldValue}_${props.field.fieldName}_${option.value}`;
    }
    const checkboxContainerClasses = computed(
      () => {
        let iconColor: string;
        switch (props.field.fieldIcon) {
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
      }
    );
    const fieldIconChoice = computed(() => {
      let icon: string[];
      switch (props.field.fieldIcon) {
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
    input:checked ~ .checkmark {
      background: $color-blue;
    }
    label {
      padding: 15px;
      padding-left: 35px;
    }
    .checkmark {
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
