
<template>
  <div :class="checkboxContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <input
      :id="fieldID"
      v-model="valueRef"
      type="checkbox"
      :class="checkboxClasses"
      :name="field.propertyName"
      :disabled="field.disabled || field.readOnly"
      @change="handleChange"
    >
    <label :for="field.propertyName"> {{ field.inputPost }}</label>
    <label
      v-if="undefinedCheck(field.suffix)"
      :for="field.propertyName"
    >
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import { fieldMixins } from "./index";
import { computed, defineComponent, PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
    name:"ChoiceCheckBox",
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
    setup(props, context){
      const valueRef = ref(props.field.value);
      const checkboxClasses = computed(() => `checkbox-primary radio ${props.field.className}`);
      const checkboxContainerClasses = computed(() => `checkbox-container ${props.classname}`);
      const fieldID = computed(() => `${props.field.propertyName}_id`);
      function handleChange(e: Event) {
        context.emit("onChange", e, valueRef);
      }
      return {
        valueRef,
        fieldID,
        checkboxClasses,
        checkboxContainerClasses,
        handleChange,
      };
    },
});
</script>

<style scoped lang="scss">
.checkbox-container {
  font-family: $font-primary;
  font-size: $font-size-l;
  label {
    margin-left: 15px;
  }
}
</style>