<template>
  <div
    v-if="field.value"
    :class="valueContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <input
      :id="fieldID"
      v-model="valueRef"
      type="text"
      :name="fieldName"
      :maxlength="field?.maxLength"
      :required="field?.isMandatory"
      :hidden="field?.isHidden"
      :aria-label="field.helpText"
      :title="field.helpText"
      :disabled="field.disabled || field.isReadOnly"
      :class="valueClasses" />
    <label v-if="undefinedCheck(field)">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import {
  PropType,
  ref,
  defineComponent,
  computed,
} from "vue";
import {IField} from "../../models/Mediakiwi/Interfaces";
import {fieldMixins} from "./../form";

export default defineComponent({
  name: "FormValue",
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
    const fieldName = computed(
      () => `${props.field.propertyName}_value`
    );
    const valueContainerClasses = computed(
      () => `name-value ${props.classname}`
    );
    const valueClasses = computed(
      () => `long short ${props.field.className}`
    );
    const fieldID = computed(
      () => `${props.field.propertyName}_id`
    );
    const valueRef = ref(props.field.value);
    function handleChange() {
      context.emit("value-changed", valueRef, props.field);
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
    padding-left: 15px;
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
