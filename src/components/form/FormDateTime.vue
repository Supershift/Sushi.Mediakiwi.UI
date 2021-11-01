<template>
  <div :class="datetimeContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <datetimepicker
      v-model="valueRef"
      :format="componentFormat"
      @change="handleChange"
      :timePicker="valueType === 'time'"
      :enableTimePicker="valueType === 'time'"
    >
      <template #input-icon></template>
    </datetimepicker>
    <label v-if="undefinedCheck(field.suffix)">{{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>

<script lang="ts">
import { fieldMixins } from "./index";
import DateTimePicker from "vue3-date-time-picker";
import "vue3-date-time-picker/src/Vue3DatePicker/style/main.scss";

import { computed, defineComponent, onBeforeMount, PropType, reactive, ref } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  components: {
    "datetimepicker": DateTimePicker 
  },
  mixins: [fieldMixins],
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
    valueType: {
      type: String,
      required: false,
      default: "",
    }
  },
  emits: ["onChange"],
  setup(props, context) {
    const datetimeContainerClasses = computed(() => `datetime-container ${props.classname}`);
    const daysOfTheWeek = 7;
    const settings = reactive({
      phrases: {
        ok: "Ok",
        cancel: "Cancel",
        next: "Next"
      },
      weekStart: props.field.weekStart ? props.field.weekStart : daysOfTheWeek,
      defaultlocale: props.field.locale ? props.field.locale : "en-US",
    });
    let valueRef = ref(new Date());
    const componentFormat = computed(() => {
      switch (props.valueType) {
        case "date":
            return "dd-MM-yyyy";
        case "time":
            return "HH:mm";
        default:
          return "dd-MM-yyyy HH:mm";
      }
    });
    function handleChange() {
      if (props.field.event !== "none") {
        context.emit("onChange", null, valueRef);
      }
    }
    function checkLocale () {
      if (props.field.locale) {
        switch (props.field.locale.toLowerCase()) {
          case "nl":
          case "nl-nl":
            settings.phrases = { ok: "Ok", cancel: "Annuleren", next: "Volgende" };
            break;
        }
      }
    }
    onBeforeMount(() => {
      checkLocale();
    });
    return {
      settings,
      valueRef,
      componentFormat,
      datetimeContainerClasses,
      handleChange,
    };
  },
});
</script>

<style scoped>
.datetime-container {
  margin-bottom: 15px;
}
</style>
