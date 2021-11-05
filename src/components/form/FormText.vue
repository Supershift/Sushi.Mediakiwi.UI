
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
      :disabled="field.disabled || field.readOnly"
      v-on="
        customEventHandler(field, handleChange)
      " />
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
      required: true,
    },
  },
  mixins: [fieldMixins],
  emits: ["on-change"],
  setup(props, context) {
    const valueRef = ref(props.field.value);

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
        "on-change",
        e,
        props.field,
        valueRef
      );
    }

    return {
      fieldID,
      textClasses,
      textContainerClasses,
      handleChange,
      valueRef,
      customEventHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.text-primary {
  width: 100%;
}
</style>
