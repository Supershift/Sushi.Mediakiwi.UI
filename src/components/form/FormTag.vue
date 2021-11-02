<template>
  <div :class="customRichtextContainerClasses">
    <label v-if="undefinedCheck(field?.prefix)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <TagsInput
      :name="field?.propertyName"
      :model-value="valueRef"
      :options="field?.options"
      :allow-custom="true"
      :show-count="false"
      @changeMade="handleChange" />
    <label v-if="undefinedCheck(field?.suffix)">{{
      undefinedCheck(field.suffix)
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
  name: "FormTag",
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
  components: {
    TagsInput,
  },
  emits:["tagsUpdated"],
  setup(props, context) {
    let valueRef = ref([]);
    let tagRef = ref("");
    const customRichtextContainerClasses =
      computed(() => [
        "tags-container ",
        props.classname,
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
}
</style>
