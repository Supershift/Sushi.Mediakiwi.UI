<template>
  <div :class="customRichtextContainerClasses">
    <editor
      v-model="valueRef"
      api-key="no-api-key"
      :id="fieldID"
      :name="id"
      :init="tinymce"
      :class="customRichtextClasses"
      :disabled="richtext.disabled || richtext.readOnly"
      v-on="localEventHandler('handleChange')"
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
      "editor": Editor,
    },
    props: {
      richtext: {
        type: Object as PropType<FieldModel>,
        required: true,
      }
    },
    emits: ["valueChanged"],
    setup(props, context){
      let valueEvent = ref("");
      let valueRef = ref("");
      const tinymce = reactive({
        language: `${props.richtext.locale}` ? `${props.richtext.locale}` : "en",
        menubar: false,
        statusbar: false,
        plugins: "code link",
        toolbar: ["bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code"],
      });
      const customRichtextClasses = computed(() => ["richtext-container ", props.richtext?.className]);
      const fieldID = computed((option: OptionModel) => {
        return `${props.richtext?.value}_${props.richtext?.propertyName}_${option?.value}`;
      });
      function handleChange(values: string) {
        if (props.richtext?.event !== "none") {
          context.emit("valueChanged", values);
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
        tinymce,
        valueRef,
      };
    },
});
</script>

<style scoped lang="scss"></style>