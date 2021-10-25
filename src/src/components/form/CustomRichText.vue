<template>
  <div :class="classname">
    <!-- <tinymce-editor
      v-model="richtext.value"
      :name="id"
      :id="fieldID"
      :init="tinymce"
      :class="fieldClass(field)"
      :disabled="richtext.disabled || richtext.readOnly"
      v-on="localEventHandler('handleChange')"
    /> -->
    <QuilEditor :modules="modules" theme="snow" @change="handleChange" />
  </div>
</template>
<script lang="ts">
// import Editor from '@tinymce/tinymce-vue';
import { defineComponent, PropType } from "vue";
import OptionModel from "../../models/OptionModel";
import RichtextModel from "../../models/RichtextModel";
import QuillEditor from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter";

export default defineComponent({
    props: {
      richtext: {
        type: Object as PropType<RichtextModel>
      }
    },
    mixins: [],
    emits: ["valueChanged"],
    components: {
      QuillEditor,
    },
    setup(props, context){
      const modules = {
        name: "blotFormatter",
        module: BlotFormatter,
        options: {
          // Here some options
        }
      }
      function fieldID(option: OptionModel) {
        return `${props.richtext.fieldValue}_${props.richtext.fieldName}_${option.value}`;
      }
      function handleChange(values) {
        if (props.richtext.event !== "none") {
          context.emit("valueChanged", values)
        }
      }
      function localEventHandler(method) {
        switch (this.field.event) {
          case "blur":
            props.richtext.event = "onBlur";                        
        }
        return; //this.eventHandler(this.field, method);
      }
      return {
        fieldID,
        handleChange,
        localEventHandler,
        modules,
      };
    },
});
</script>

<style scoped lang="scss">
@import "@vueup/vue-quill/dist/vue-quill.snow.css";
</style>