<template>
  <div :class="customRichtextContainerClasses">
    <label v-if="undefinedCheck(field?.prefix)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <TagsInput
      :field-model="valueRef"
      :options="field?.options"
      :allow-custom="false"
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
import TagsInput from "./FormTagsInput.vue";
import { Field } from "../../models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";

export default defineComponent({
  name: "FormTag",
  props: {
    field: {
      type: Object as PropType<Field>,
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
  emits: ["value-changed"],
  setup(props, context) {
    let valueRef = ref(
      props.field.value ? props.field.value.split(",") : []
    );
    let tagRef = ref("");
    const customRichtextContainerClasses =
      computed(() => [
        "tags-container ",
        props.classname,
      ]);
    function handleChange() {
      context.emit(
        "value-changed",
        valueRef,
        props.field,
        
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
