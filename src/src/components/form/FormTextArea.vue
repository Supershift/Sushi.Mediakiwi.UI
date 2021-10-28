<template>
  <div :class="customTextAreaContainerClasses">
    <textarea
      :id="id"
      ref="root"
      v-model="valueRef"
      cols="32"
      rows="3"
      type="text"
      :class="customTextAreaClasses"
      :name="textarea.propertyName"
      :disabled="textarea.disabled || textarea.readOnly"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, ref } from "vue";
import { fieldMixins } from "./index";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  name: "TextArea",
  mixins: [fieldMixins],
  props: {
    textarea: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    let offset = ref<number>(0);
    let valueRef = ref("");
    // const root = ref(null);
    const id = computed(() => `_${props.textarea?.className}-${props.textarea.propertyName}`);
    const customTextAreaClasses = computed(() => ["textarea-primary ", props.textarea?.className]);
    const customTextAreaContainerClasses = computed(() => ["textarea-container ", props.classname]);
    function handleChange(e: Event) {
      context.emit("onChange", e, props.textarea);
    }
    function autoResize(element: HTMLElement) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + offset.value + "px";
    }
    onBeforeMount(() => {
      // root.addEventListener("input", (e) => autoResize(e.target));
    });
    return {
      id,
      valueRef,
      // root,
      offset,
      customTextAreaClasses,
      customTextAreaContainerClasses,
      handleChange,
      autoResize
    };
  },
});
</script>

<style scoped lang="scss">
.textarea-container {
  margin-top: $grid-s-gutter;;
}
</style>
