<template>
  <div
    :class="customNameValueContainerClasses"
    v-if="field.value">
    <label v-if="undefinedCheck(field.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <input
      type="text"
      v-model="valueNameRef"
      :name="fieldName"
      :id="fieldName"
      :aria-label="field.helpText"
      :title="field.helpText"
      :maxlength="field?.maxLength"
      :required="field?.isMandatory"
      :hidden="field?.isHidden"
      :disabled="field.disabled || field.isReadOnly"
      :class="customNameValueClasses" />
    <input
      type="text"
      v-model="valueNameValueRef"
      :name="fieldNameValue"
      :id="fieldNameValue"
      :disabled="field.disabled || field.isReadOnly"
      :aria-label="field.helpText"
      :maxlength="field?.maxLength"
      :required="field?.isMandatory"
      :hidden="field?.isHidden"
      :title="field.helpText"
      @change="handleChange"
      :class="customNameValueClasses" />
    <label v-if="undefinedCheck(field.suffix)">{{
      undefinedCheck(field.suffix)
    }}</label>
  </div>
</template>
<script lang="ts">
import {
  PropType,
  defineComponent,
  ref,
  computed,
} from "vue";
import {fieldMixins} from "./../form";
import {IField} from "../../models/Mediakiwi/Interfaces";
export default defineComponent({
  name: "FormNamValue",
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [fieldMixins],
  emits: ["value-changed"],
  setup(props, context) {
    const valueNameRef = ref(
      props.field.value
    );
    const valueNameValueRef = ref(
      props.field.title
    );
    const fieldName = computed(
      () => `${props.field.propertyName}_name`
    );
    const fieldNameValue = computed(
      () => `${props.field.propertyName}_value`
    );
    const customNameValueClasses = computed(
      () => [
        "long short ",
        props.field?.className,
      ]
    );
    const customNameValueContainerClasses =
      computed(() => [
        "name-value-container ",
        props.classname,
      ]);
    function handleChange() {
      context.emit("value-changed", valueNameRef, props.field);
    }
    return {
      handleChange,
      fieldNameValue,
      fieldName,
      valueNameRef,
      valueNameValueRef,
      customNameValueClasses,
      customNameValueContainerClasses,
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

  input {
    padding-left: 15px;
  }
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
