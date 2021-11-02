<template>
  <div :class="radioContainerClasses">        
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <span
      v-for="option in field.options"
      :key="fieldID(option)"
    >
      <input
        :id="fieldID(option)"
        v-model="valueRef"
        type="radio"
        :class="radioClasses + errorClass(field)"
        :name="field.groupName"
        :value="option.value"
        :disabled="field.disabled || field.readOnly"
        @change="handleChage"
      >
      <label :for="fieldID(option)">{{ option.name }}</label>
    </span>
    <label v-if="undefinedCheck(field.suffix)">{{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";
import OptionModel from "../../models/OptionModel";
import { fieldMixins } from "./index";

export default defineComponent({
    name:"ChoiceRadio",
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
    emits: ["onChange"],
    setup(props, context) {
      let valueRef = ref(0);
      const radioContainerClasses = computed(() => `radio-container ${props.classname}`);
      const radioClasses = computed(() => `radio-primary radio ${props.field.className}`);
      if (typeof props.field?.value === "string") {
        if (props.field.value.toLowerCase() === "false") {
          valueRef.value = 0;
        }
        else if (props.field.value.toLowerCase() === "true") {
          valueRef.value = 1;
        }
      }
      function fieldID(option: OptionModel) { return `${props.field.propertyName}_${option.value}`; }
      function handleChange(e: Event) {
        if (props.field.event !== "none") {
          context.emit("onChange", e, valueRef);
        }
      }
      return {
        fieldID,
        valueRef,
        handleChange,
        radioClasses,
        radioContainerClasses,
      };
    },
});
</script>

<style scoped lang="scss">
.radio-container {
  font-family: $font-primary;
  font-size: $font-size-l;
  input {
    margin: 0;
  }
  label {
    margin-left: 15px;
  }
}
</style>