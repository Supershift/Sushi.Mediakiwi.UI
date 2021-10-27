<template>
  <div :class="customRichtextContainerClasses">
    <!-- <tinymce-editor
      v-model="richtext.value"
      :name="id"
      :id="fieldID"
      :init="tinymce"
      :class="fieldClass(field)"
      :disabled="richtext.disabled || richtext.readOnly"
      v-on="localEventHandler('handleChange')"
    /> -->
    <QuillEditor
      :modules="modules"
      toolbar="full"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
// import Editor from '@tinymce/tinymce-vue';
import { defineComponent, PropType, ref, computed } from "vue";
import OptionModel from "../../models/OptionModel";
import RichtextModel from "../../models/RichtextModel";
import QuillEditor from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineComponent({
    name: "RichText",
    components: {
      QuillEditor,
    },
    mixins: [],
    props: {
      richtext: {
        type: Object as PropType<RichtextModel>,
        required: true,
      }
    },
    emits: ["valueChanged"],
    setup(props, context){
      let valueEvent = ref("");
      const modules = {
        name: "blotFormatter",
        module: BlotFormatter,
        options: {
          // Here some options
        },
      };
      const customRichtextClasses = computed(() => ["richtext-container ", props.richtext.customClass]);
      function fieldID(option: OptionModel) {
        return `${props.richtext?.fieldValue}_${props.richtext?.fieldName}_${option.value}`;
      }
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
        modules,
      };
    },
});
</script>

<style scoped lang="scss"></style>