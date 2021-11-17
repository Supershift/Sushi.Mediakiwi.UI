<template>
  <div :class="customTextAreaContainerClasses">
    <textarea
      :id="fieldID"
      v-model="valueRef"
      cols="32"
      rows="3"
      type="text"
      :class="customTextAreaClasses"
      :aria-label="field.helpText"
      :title="field.helpText"
      v-on="
        customEventHandler(field, handleChange)
      " />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import {
  customEventHandler,
  fieldMixins,
} from "./index";
import FieldModel from "../../models/Mediakiwi/FieldModel";

export default defineComponent({
  name: "FormTextArea",
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
  emits: ["on-change"],
  setup(props, context) {
    let offset = ref<number>(0);
    let valueRef = ref(props.field.value);
    // const root = ref(null);
    const fieldID = computed(
      () =>
        `_${props.field?.className}-${props.field?.propertyName}`
    );
    const customTextAreaClasses = computed(() => [
      "textarea-primary ",
      props.field?.className,
    ]);
    const customTextAreaContainerClasses =
      computed(() => [
        "textarea-container ",
        props?.classname,
      ]);
    function handleChange(e: Event) {
      context.emit(
        "on-change",
        e,
        props.field,
        valueRef
      );
    }
    function autoResize(element: HTMLElement) {
      element.style.height = "auto";
      element.style.height =
        element.scrollHeight +
        offset.value +
        "px";
    }

    return {
      fieldID,
      valueRef,
      // root,
      offset,
      customTextAreaClasses,
      customTextAreaContainerClasses,
      handleChange,
      autoResize,
      customEventHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.textarea-container {
  margin-bottom: 15px;
  textarea {
    width: 100%;
    padding: 7px;
    padding-left: 15px;
  }
}
</style>
