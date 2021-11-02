<template>
  <div
    v-if="field.value"
    :class="valueContainerClasses"
  >
    <label v-if="undefinedCheck(field.prefix)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <input
      :id="fieldID"
      v-model="valueRef"
      type="text"
      :name="fieldName"
      :disabled="field.disabled || field.readOnly"
      :class="valueClasses"
      >
    <label v-if="undefinedCheck(field)">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import { PropType, ref,defineComponent, computed } from "vue";
import FieldModel from "../../models/FieldModel";
import { fieldMixins } from "./../form";    

export default defineComponent({
  name: "FormValue",
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
    const fieldName = computed(() => `${props.field.propertyName}_value`);
    const valueContainerClasses = computed(() => `name-value ${props.classname}`);
    const valueClasses = computed(() => `long short ${props.field.className}`);
    const fieldID = computed(() => `${props.field.propertyName}_id`);
    const valueRef = ref(props.field.value.text);
    function  handleChange(e: Event) {
      context.emit("onChange", e, valueRef);
    }
    return {
      handleChange,
      valueContainerClasses,
      valueClasses,
      fieldName,
      fieldID,
      valueRef,
    };
  },
});
</script>

<style scoped lang="scss">
.name-value {
  width: 100%;
  flex: 1;
  display: inline-flex;

  input:first-child {
      width: 33%;
  }

  input:nth-child(2) {
      flex: 1;
      width: auto;
      margin-left: 5px;
  }

  input:only-child {
      width: 100%;
  }
}
</style>
