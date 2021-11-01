<template>
  <div :class="customRichtextContainerClasses">
    <label v-if="undefinedCheck(tags.prefix)">{{
      undefinedCheck(tags.prefix)
    }}</label>
    <TagsInput
      :name="tags.propertyName"
      :model-value="valueRef"
      :options="tags.options"
      :allow-custom="true"
      :show-count="false"
      @changeMade="handleChange" />
    <label v-if="undefinedCheck(tags.suffix)">{{
      undefinedCheck(tags.suffix)
    }}</label>
  </div>
</template>

<script lang="ts">
import {fieldMixins} from "./index";
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import FieldModel from "../../models/FieldModel";
import TagsInput from "./FormTagsInput.vue";

export default defineComponent({
  name: "FormTags",
  props: {
    tags: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    // classname: {
    //   type: String,
    //   required: true,
    // },
  },
  mixins: [fieldMixins],
  components: {
    // VueTagsInput,
    TagsInput,
  },
  setup(props, context) {
    let valueRef = ref([]);
    let tagRef = ref("");
    const customRichtextContainerClasses =
      computed(() => [
        "tags-container ",
        props.tags?.className,
      ]);
    function handleChange() {
      context.emit("tagsUpdated", valueRef);
    }
    return {
      valueRef,
      tagRef,
      customRichtextContainerClasses,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
.tags-container {
  margin-bottom: 15px;
  width: 50%;
}
</style>
