
<template>
  <div :class="textContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <input
      type="text"
      v-model="valueRef"
      :class="textClasses"
      :name="field.propertyName"
      :id="fieldID"
      :aria-label="field.helpText"
      :title="field.helpText"
      :disabled="field.disabled || field.readOnly"
      @input="handleChange"/>
    <label v-if="undefinedCheck(field.suffix)">{{
      undefinedCheck(field.suffix)
    }}</label>
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
import {MediakiwiFormVueType} from "@/models/Mediakiwi/MediakiwiFormVueType";

export default defineComponent({
  name: "FormText",
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
  emits: ["value-changed"],
  setup(props, context) {
    let valueRef = ref(props.field?.value);
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
          MediakiwiFormVueType.formChoiceCheckbox
      ) {
        return `text-primary half short ${props.field.className}`;
      }
      return `text-primary ${props.field.className}`;
    });

    function handleChange(e?: Event) {
      context.emit(
        "value-changed",
        valueRef.value,
        props.field,

      );
    }

    return {
      fieldID,
      textClasses,
      valueRef,
      textContainerClasses,
      handleChange,
      customEventHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.text-primary {
  width: 100%;
  padding: 15px;
}
</style>
