<template>
  <div :class="customRichtextContainerClasses">
    <label v-if="undefinedCheck(tags.prefix)">{{ undefinedCheck(tags.prefix) }}</label>
    <TagsInput
      :name="tags.propertyName"
      :modelValue="valueRef"
      :options="tags.options"
      :allowCustom="true"
      :showCount="false"
      @changeMade="handleChange"
    />
    <label v-if="undefinedCheck(tags.suffix)">{{ undefinedCheck(tags.suffix) }}</label>
  </div>
</template>

<script lang="ts">
import { fieldMixins } from "./index";
import {  computed, defineComponent,  PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";
import TagsInput from "./TagsInput.vue";


export default defineComponent({
  name: "Tags",
  components: {
    // VueTagsInput,
    TagsInput,
  },
  mixins: [fieldMixins],
  props: {
    tags: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    let valueRef = ref([]);
    let tagRef = ref("");
    const customRichtextContainerClasses = computed(() => ["tags-container ", props.tags?.className]);
    function handleChange() {
      context.emit("tagsUpdated", valueRef);
    }
    return {
      valueRef,
      tagRef,
      customRichtextContainerClasses,
      handleChange
    };
  },
});
</script>

<style scoped lang="scss">
.tags-container {
  margin-top: $grid-s-gutter;
  width: 50%;
}
</style>
