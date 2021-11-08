<template>
  <FormDateTime
    :field="field"
    :classname="classname"
    value-type="date"
    @on-change="handleChange" />
</template>

<script lang="ts">
import FormDateTime from "./FormDateTime.vue";
import {defineComponent, PropType} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";

export default defineComponent({
  name: "FormDate",
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
  components: {
    FormDateTime,
  },
  emits: ["on-change"],
  setup(props, context) {
    function handleChange(
      e: Event,
      field: FieldModel,
      value: Date
    ) {
      context.emit("on-change", e, field, value);
    }
    return {
      handleChange,
    };
  },
});
</script>
