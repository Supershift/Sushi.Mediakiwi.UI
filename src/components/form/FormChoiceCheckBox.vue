
<template>
  <div :class="checkboxContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <input
      :id="fieldID"
      v-model="valueRef"
      type="checkbox"
      :class="checkboxClasses"
      :name="field.propertyName"
      :disabled="field.disabled || field.readOnly"
      v-on="
        customEventHandler(field, handleChange)
      " />
    <label :for="field.propertyName">
      {{ field.inputPost }}</label
    >
    <label
      v-if="undefinedCheck(field.suffix)"
      :for="fieldID">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import {
  customEventHandler,
  fieldMixins,
} from "./index";
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";

export default defineComponent({
  name: "ChoiceCheckBox",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
  },
  mixins: [fieldMixins],
  emits: ["on-change"],
  setup(props, context) {
    const valueRef = ref(props.field.value);
    const checkboxClasses = computed(
      () =>
        `checkbox-primary radio ${props.field.className}`
    );
    const checkboxContainerClasses = computed(
      () =>
        `checkbox-container ${props.classname}`
    );
    const fieldID = computed(
      () => `${props.field.propertyName}_id`
    );
    function handleChange(e: Event) {
      context.emit(
        "on-change",
        e,
        props.field,
        valueRef
      );
    }

    return {
      valueRef,
      fieldID,
      checkboxClasses,
      checkboxContainerClasses,
      handleChange,
      customEventHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.checkbox-container {
  font-family: $font-primary;
  font-size: $font-size-l;
  input {
    width: auto;
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
}
</style>
