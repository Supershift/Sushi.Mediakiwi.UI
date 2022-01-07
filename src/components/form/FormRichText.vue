<template>
  <div :class="customRichtextContainerClasses">
    <editor
      api-key="4w7n1fpw2lpcb86gkmkqfpsrefktlebicr8wc1lzwuy0evy4"
      :id="field.propertyName"
      :init="tinymceInit"
      v-model="valueRef"
      :class="customRichtextClasses"
      :aria-label="field.helpText"
      :title="field.helpText"
      v-on="
        customEventHandler(field, handleChange)
      " />
  </div>
</template>
<script lang="ts">
// import Editor from '@tinymce/tinymce-vue';
import {
  defineComponent,
  PropType,
  ref,
  computed,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";
import Editor from "@tinymce/tinymce-vue";
import {customEventHandler} from "./index";
export default defineComponent({
  name: "RichText",
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
  components: {
    editor: Editor,
  },
  emits: ["value-changed"],
  setup(props, context) {
    let valueRef = ref(props.field.value);

    const customRichtextContainerClasses =
      computed(() => [
        "richtext-container ",
        props.field?.className,
      ]);
    const customRichtextClasses = computed(() => [
      "richtext-primary ",
      props.classname,
    ]);

    function handleChange(e: Event) {
      context.emit(
        "value-changed",
        valueRef,
        props.field
      );
    }
    const tinymceInit = {
      menubar: false,
      statusbar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      selector:props.field.propertyName,
      toolbar:
        "bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code",
    };

    return {
      handleChange,
      customRichtextClasses,
      customRichtextContainerClasses,
      valueRef,
      tinymceInit,
      customEventHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.richtext-container {
  font-family: $font-primary;
  margin-bottom: 15px;
}
</style>
