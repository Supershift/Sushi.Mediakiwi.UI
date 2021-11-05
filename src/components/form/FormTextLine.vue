<template>
  <div :class="textlineContainerClasses">
    <label v-if="undefinedCheck(field?.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <label
      :id="fieldID"
      :class="textlineClasses"
      :name="field.propertyName">
      {{ valueRef }}
    </label>
    <label v-if="undefinedCheck(field.suffix)">{{
      undefinedCheck(field.suffix)
    }}</label>
  </div>
</template>
<script lang="ts">
import {MediakiwiFormVueType} from "@/models/Mediakiwi/MediakiwiFormVueType";
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";
import {fieldMixins} from "./index";

export default defineComponent({
  name: "FormTextLine",
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
  setup(props) {
    let valueRef = ref(props.field?.value);
    const fieldID = computed(
      () => `${props.field?.propertyName}_id`
    );
    const textlineContainerClasses = computed(
      () =>
        `textline-container ${props.classname}`
    );
    if (
      props.field?.expression &&
      props.field.vueType ===
        MediakiwiFormVueType.formChoiceRadio
    ) {
      props.field.value
        ? (valueRef.value = "Yes")
        : valueRef.value + "No";
    }
    const textlineClasses = computed(() => {
      if (
        props.field?.expression &&
        props.field.vueType ===
          MediakiwiFormVueType.formChoiceCheckbox
      ) {
        return `textline-primary half short ${props.field?.className}`;
      }
      return `textline-primary ${props.field?.className}`;
    });
    return {
      fieldID,
      valueRef,
      textlineContainerClasses,
      textlineClasses,
    };
  },
});
</script>

<style scoped lang="scss">
.textline-container {
  margin-bottom: 15px;
  font-family: $font-primary;
  font-size: $font-size-l;
}
</style>
