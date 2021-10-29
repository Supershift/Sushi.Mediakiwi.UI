<template>
  <div :class="classname">        
    <label v-if="prefix(field)">{{ prefix(field) }}</label>
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
      <label :for="fieldID(option)">{{ option.text }}</label>
    </span>
    <label v-if="suffix(field.suffix)">{{ suffix(field.suffix) }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";
import { fieldMixins } from "./index";

export default defineComponent({
    name:"FormRadio",
    mixins: [fieldMixins],
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
    emits: ["onChange"],
    setup(props, context) {
      const valueRef = ref(0);
      const radioContainerClasses = computed(() => `radio-container ${props.classname}`);
      const radioClasses = computed(() => `radio-primary radio ${props.field.className}`);
      if (typeof (props.field.value) === "string") {
        if (props.field.value.toLowerCase() === "false") {
          valueRef.value = 0;
        }
        else if (props.field.value.toLowerCase() === "true") {
          valueRef.value = 1;
        }
      }
      const fieldID = computed((option) => `${props.field.propertyName}_${option.value}`);
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