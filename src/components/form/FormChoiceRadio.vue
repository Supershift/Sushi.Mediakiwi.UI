<template>
  <div
    v-if="field.options && field.options"
    :class="radioContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <span
      v-for="option in field.options"
      :key="fieldID(option)">
      <input
        :id="fieldID(option)"
        v-model="valueRef"
        type="radio"
        :class="radioClasses + errorClass(field)"
        :name="field.groupName"
        :value="option.value"
        :aria-label="field.helpText"
        :title="field.helpText"
        :disabled="
          field.disabled || field.readOnly
        "
        @change="handleChange" />
      <label class="" :for="fieldID(option)" v-html="option.text"/>
    </span>
    <label v-if="undefinedCheck(field.suffix)">{{
      undefinedCheck(field.suffix)
    }}</label>
  </div>
  <div v-else :class="radioContainerClasses">
    <label
      class="error-label"
      :for="field.propertyName"
      v-if="field.value"
      >{{ parseEmptyOption }}</label
    >
  </div>
</template>
<script lang="ts">
import {MediakiwiJSEventType} from "@/models/Mediakiwi/MediakiwiJSEventType";
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";
import OptionItemModel from "../../models/OptionItemModel";
import {fieldMixins} from "./index";

export default defineComponent({
  name: "FormChoiceRadio",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [fieldMixins],
  emits: ["on-change"],
  setup(props, context) {
    let valueRef = ref(props.field.value);
    const parseEmptyOption  = computed(() => {
      return (props.field.value === "1" || props.field.value === 1) ? "Allowed" : "Not-Allowed"
    })
    const radioContainerClasses = computed(
      () => `radio-container ${props.classname}`
    );
    const radioClasses = computed(
      () =>
        `radio-primary radio ${props.field.className}`
    );
    if (typeof props.field?.value === "string") {
      if (
        props.field.value.toLowerCase() ===
        "false"
      ) {
        valueRef.value = 0;
      } else if (
        props.field.value.toLowerCase() === "true"
      ) {
        valueRef.value = 1;
      }
    }
    function fieldID(option: OptionItemModel) {
      return `${props.field.propertyName}_${option.value}`;
    }
    function handleChange(e: Event) {
      if (
        props.field.event !==
        MediakiwiJSEventType.none
      ) {
        context.emit(
          "on-change",
          e,
          props.field,
          valueRef
        );
      }
    }
    return {
      fieldID,
      valueRef,
      handleChange,
      radioClasses,
      radioContainerClasses,
      parseEmptyOption,
    };
  },
});
</script>

<style scoped lang="scss">
.radio-container {
  font-family: $font-primary;
  font-size: $font-size-l;
  display: flex;
  flex-direction: column;
  input {
    margin: 0;
    &:disabled {
      cursor: not-allowed;
    }
    &:disabled ~ label {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  label {
    margin-left: 15px;
  }
  .error-label {
    margin: 0;
    opacity: 0.5;
  }
}
</style>
