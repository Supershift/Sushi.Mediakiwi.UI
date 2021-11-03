<template>
  <div :class="inputContainerClasses">
    <label
      v-if="undefinedCheck(field.prefix)"
      class="input-prefix"
    >
      {{ undefinedCheck(field?.prefix) }}
    </label>
    <fa
      v-if="field.fieldIcon"
      :icon="fieldIconChoice"
      class="input-icon"
    />
    <label
      :for="field.propertyName"
      class="input-label"
    >
      <input
        :id="id"
        type="text"
        :class="customInputClasses"
        :name="field.propertyName"
        :value="inputText.value"
        :required="field.fieldRequired"
        :placeholder="field.title"
        :disabled="field.disabled || field.readOnly"
        @change="handleChange"
      >
    </label>
    <label
      v-if="undefinedCheck(field.suffix)"
      class="input-suffix"
    >
      {{ undefinedCheck(field?.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
} from "vue";
import FieldModel from "../../models/FieldModel";
import { fieldMixins } from "../form/index";

export default defineComponent({
  name: "FormInput",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
  },
  mixins: [fieldMixins],
  emits: ["valueChanged"],
  setup(props, context) {
    const inputText = reactive({value: ""});
    const id = computed(() => `_${props.field?.className}-${props.field.propertyName}`);
    const inputContainerClasses = computed(() => {
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
      return ["input-container ", iconColor];
    });
    const customInputClasses = computed(() => ["input-primary ", props.field?.className]);
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
    function handleChange() {
      context.emit("valueChanged");
    }
    return {
      id,
      inputText,
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
  margin: 0;
  margin-bottom: 15px;
  margin-left: -70px;
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
  }
}
</style>
