<template>
    <div :class="customRichtextContainerClasses">
        <editor
            api-key="4w7n1fpw2lpcb86gkmkqfpsrefktlebicr8wc1lzwuy0evy4"
            :id="field?.propertyName"
            :init="tinymceInit"
            v-model="valueRef"
            :class="customRichtextClasses"
            @blur="handleChange"
        />
    </div>
</template>
<script lang="ts">
// import Editor from '@tinymce/tinymce-vue';
import { defineComponent, PropType, ref, computed, reactive } from "vue";
import FieldModel from "../../models/FieldModel";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  name: "RichText",
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
  components: {
    editor: Editor,
  },
  emits: ["valueChanged"],
  setup(props, context) {
    let valueRef = ref("");

    const customRichtextContainerClasses = computed(() => [
      "richtext-container ",
      props.field?.className,
    ]);
    const customRichtextClasses = computed(() => [
      "richtext-primary ",
      props.classname,
    ]);

    function handleChange(values: string) {
      if (props.field?.event !== "none") {
        context.emit("valueChanged", values);
      }
    }
    const tinymceInit = {
      menubar: false,
      statusbar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      toolbar:
        "bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code",
    };

    return {
      handleChange,
      customRichtextClasses,
      customRichtextContainerClasses,
      valueRef,
      tinymceInit,
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
