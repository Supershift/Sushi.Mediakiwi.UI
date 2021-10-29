<template>
  <div :class="textlineContainerClasses">
    <label v-if="undefinedCheck(textline.prefix)">{{ undefinedCheck(textline.prefix) }}</label>
    <label
      :id="textline.propertyName"
      :class="textlineClasses"
      :name="textline.propertyName"
    >
      {{ valueRef }}
    </label>
    <label v-if="undefinedCheck(textline)">{{ undefinedCheck(textline.suffix) }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";
import { fieldMixins, vueTypes } from "./index";

export default defineComponent({
  name: "TextLine",
  mixins: [fieldMixins],
  props: {
    textline: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let valueRef = ref(props.textline.value);
    const fieldID = computed(() => `${props.textline.propertyName}_id`);
    const textlineContainerClasses = computed(() => `textline-container ${props.classname}`);
    if (props.textline.expression && props.textline.vueType === vueTypes.formChoiceRadio) {props.textline.value ? valueRef.value = "Yes" : "No";
    }
    const textlineClasses = computed(() => {
      if (props.textline.expression && props.textline.vueType === vueTypes.formChoiceCheckbox) {
        return `textline-primary half short ${props.textline.className}`;
      }
      return `textline-primary ${props.textline.className}`;
    });
    return {
      fieldID,
      textlineContainerClasses,
      textlineClasses,
    };
  },
});
</script>

<style scoped lang="scss">
.textline-primary {
  margin-bottom: 15px;
}
</style>