<template>
  <div :class="customRichtextContainerClasses">
    <Editor
      apiKey="4w7n1fpw2lpcb86gkmkqfpsrefktlebicr8wc1lzwuy0evy4"
      :id="fieldID"
      :name="fieldID"
      :init="{
        language: `${richtext.locale}` ? `${richtext.locale}` : 'en',
        menubar: false,
        statusbar: false,
        plugins: ['code link'],
        selector: 'textarea',
        toolbar: 'bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code',
      }"
      :class="customRichtextClasses"
      :disabled="richtext.disabled || richtext.readOnly"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
// import Editor from '@tinymce/tinymce-vue';
import { defineComponent, PropType, ref, computed, reactive } from "vue";
import OptionModel from "../../models/OptionModel";
import FieldModel from "../../models/FieldModel";
import Editor from "@tinymce/tinymce-vue";


export default defineComponent({
    name: "RichText",
    components: {
      Editor,
    },
    props: {
      richtext: {
        type: Object as PropType<FieldModel>,
        required: true,
      },
      classname: {
        type: String,
        required: true,
      },
    },
    emits: ["valueChanged"],
    setup(props, context){
      let valueEvent = ref("");
      let valueRef = ref("");
      const tinymce = reactive({
        apikey: "4w7n1fpw2lpcb86gkmkqfpsrefktlebicr8wc1lzwuy0evy4",
        language: `${props.richtext.locale}` ? `${props.richtext.locale}` : "en",
        menubar: false,
        statusbar: false,
        plugins: ["code link"],
        selector: "textarea",
        toolbar: "bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code",
      });
      const customRichtextContainerClasses = computed(() => ["richtext-container ", props.classname]);
      const customRichtextClasses = computed(() => ["richtext-primary ", props.richtext?.className]);
      const fieldID = computed((option: OptionModel) => {
        return `${props.richtext?.value}_${props.richtext?.propertyName}_${option?.value}`;
      });
      function handleChange() {
        if (props.richtext?.event !== "none") {
          context.emit("valueChanged", valueRef);
        }
      }
      function localEventHandler(method: string) {
        switch (props.richtext?.event) {
          case "blur":
            valueEvent.value = "onBlur";
            //props.richtext.event = "onBlur";
            break;
          default:
            break;                     
        }
        return method; //this.eventHandler(this.field, method);
      }
      return {
        fieldID,
        handleChange,
        localEventHandler,
        customRichtextClasses,
        customRichtextContainerClasses,
        tinymce,
        valueRef,
      };
    },
});
</script>

<style scoped lang="scss">
.richtext-container {
  margin-bottom: 15px;
}
</style>