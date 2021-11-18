<template>
  <div :class="customRichtextContainerClasses">
    <label v-if="undefinedCheck(field?.prefix)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <TagsInput
      :model-value="valueRef"
      :options="field?.options"
      :allow-custom="true"
      :show-count="false"
      :field="field"
      @change-made="handleChange" />
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
import FieldModel from "../../models/Mediakiwi/FieldModel";
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
  emits: ["on-change"],
  setup(props, context) {
    let valueRef = ref(
      props.field.value ? props.field.value : []
    );
    let tagRef = ref("");
    const customRichtextContainerClasses =
      computed(() => [
        "tags-container ",
        props.classname,
      ]);
    function handleChange() {
      context.emit(
        "on-change",
        null,
        props.field,
        valueRef
      );
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
