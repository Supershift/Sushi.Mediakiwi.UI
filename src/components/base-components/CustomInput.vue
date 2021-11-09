<template>
  <div :class="inputContainerClasses">
    <label
      v-if="undefinedCheck(input.prefix)"
      class="input-prefix">
      {{ undefinedCheck(input?.prefix) }}
    </label>
    <!-- eslint-disable-next-line vue/no-unregistered-components -->
    <fa
      v-if="input.fieldIcon"
      :icon="fieldIconChoice"
      class="input-icon" />
    <label
      :for="input.fieldName"
      class="input-label">
      <input
        :id="id"
        :type="input.fieldType"
        :class="customInputClasses"
        :name="input.fieldName"
        v-model="valueRef"
        :required="input.fieldRequired"
        :placeholder="input.fieldPlaceholder"
        :disabled="input.disabled || input.readOnly"
        @input="handleChange"
      />
    </label>
    <label
      v-if="undefinedCheck(input.suffix)"
      class="input-suffix">
      {{ undefinedCheck(input?.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import InputModel from "../../models/InputModel";
import {fieldMixins} from "../form/index";

export default defineComponent({
  name: "FormInput",
  props: {
    input: {
      type: Object as PropType<InputModel>,
      required: true,
    },
  },
  mixins: [fieldMixins],
  emits: ["value-changed"],
  setup(props, context) {
    let valueRef = ref(props.input.fieldValue);
    const id = computed(() => `_${props.input.customClass}-${props.input.fieldName}`);
    const inputContainerClasses = computed(() => {
      let iconColor: string;
      switch (props.input.fieldIcon) {
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
      return ["input-container ", iconColor];
    });
    const customInputClasses = computed(() => [
      "input-primary ",
      props.input.customClass,
    ]);
    const fieldIconChoice = computed(() => {
      let icon: string[];
      switch (props.input.fieldIcon) {
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
    function handleChange() {
      context.emit("value-changed", valueRef.value, props.input.fieldName);
    }
    return {
      id,
      valueRef,
      inputContainerClasses,
      customInputClasses,
      fieldIconChoice,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
.input-container {
  position: relative;
  margin: 15px 0;
  width: 100%;
  .input-icon {
    position: absolute;
    top: 18px;
    left: 15px;
  }
  .input-suffix {
    position: absolute;
    right: -60px;
    top: 14px;
    color: $color-alert;
    font-size: $font-size-xxl;
  }
  .input-suffix {
    position: absolute;
    right: -60px;
    top: 14px;
    color: $color-alert;
    font-size: $font-size-xxl;
  }
}
.normal {
  .input-icon {
    color: $color-blue;
  }
}
.alert {
  .input-icon {
    color: $color-alert;
  }
}
.input-label {
  display: block;
  font-weight: bold;
  text-align: center;
  .input-primary {
    border: none;
    height: 50px;
    line-height: 40px;
    width: 100%;
    border-radius: 3px;
    padding-left: 35px;
    padding-right: 35px;
    font-size: $font-size-l;
    color: $color-drakgrey;
    box-sizing: border-box;
  }
}
</style>
