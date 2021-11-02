
<template>
  <div :class="textContainerClasses">
    <label v-if="prefix(field)" v-html="prefix(field)"></label>
    <input
      type="text"
      v-model="valueRef"
      :class="textClasses"
      :name="field.propertyName"
      :id="fieldID"
      :disabled="field.disabled || field.readOnly"
      @change="handleChange">
    <label v-if="undefinedCheck(field.suffix)">{{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>
<script lang="ts">
import { fieldMixins, vueTypes } from "./index";
import { computed, defineComponent, PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  name: "FormText",
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
  setup(props, context) {
    let valueRef = ref(props.field.value);
    const fieldID = computed(
      () => `${props.field.propertyName}_id`
    );
    const textContainerClasses = computed(
      () =>
        `textline-container ${props.classname}`
    );
    const textClasses = computed(() => {
      if (
        props.field.expression &&
        props.field.vueType ===
          vueTypes.formChoiceCheckbox
      ) {
        return `text-primary half short ${props.field.className}`;
      }
      return `text-primary ${props.field.className}`;
    });
    function handleChange(e: Event) {
      context.emit('onChange', e, valueRef);
    }
    return {
      fieldID,
      textClasses,
      textContainerClasses,
      handleChange,
    };
  },
})
</script>