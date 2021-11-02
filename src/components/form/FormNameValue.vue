<template>
  <div
    :class="customNameValueContainerClasses"
    v-if="field.value"
  >
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <input
      type="text"
      v-model="valueNameRef"
      :name="fieldName"
      :id="fieldName"
      :disabled="field.disabled || field.readOnly"
      :class="customNameValueClasses"
    >
    <input
      type="text"
      v-model="valueNameValueRef"
      :name="fieldNameValue"
      :id="fieldNameValue"
      v-bind:disabled="field.disabled || field.readOnly"
      @change="handleChange"
      :class="customNameValueClasses"
    >
    <label v-if="undefinedCheck(field.suffix)">{{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref, computed } from "vue";
import { fieldMixins } from "./../form";    
import FieldModel from "../../models/FieldModel";
export default defineComponent({
    name: "FormNamValue",
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
    emits:["onChange"],
    setup(props, context) {
      const valueNameRef = ref(props.field.value.text);
      const valueNameValueRef = ref(props.field.value.value);
      const fieldName = computed(() => `${props.field.propertyName}_name`);
      const fieldNameValue = computed(() => `${props.field.propertyName}_value`);
      const customNameValueClasses = computed(() => ["long short ", props.field?.className]);
      const customNameValueContainerClasses = computed(() => ["name-value-container ", props.classname]);
      function handleChange(e: Event) {
        context.emit("onChange", e, valueNameRef);
      }
      return {
        handleChange,
        fieldNameValue,
        fieldName,
        valueNameRef,
        valueNameValueRef,
        customNameValueClasses,
        customNameValueContainerClasses
      };
    },     
});
</script>

<style scoped lang="scss">
.name-value-container {
  width: 100%;
  flex: 1;
  display: inline-flex;
  margin-bottom: 5px;

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
