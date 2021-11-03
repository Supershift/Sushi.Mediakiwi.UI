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
import {MediakiwiJSEventType} from "@/models/Mediakiwi/MediakiwiJSEventType";

export default defineComponent({
  name: "FormDate",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
  },
  components: {
    FormDateTime,
  },
  emits: ["on-change"],
  setup(props, context) {
    function handleChange(e: Event, value: Date) {
      if (
        props.field.event !==
        MediakiwiJSEventType.none
      ) {
        context.emit("on-change", e, value);
      }
    }
    return {
      handleChange,
    };
  },
});
</script>
