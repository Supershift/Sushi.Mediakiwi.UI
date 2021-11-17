<template>
  <div :class="datetimeContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <datetimepicker
      v-model="valueRef"
      :format="componentFormat"
      @update:model-value="handleChange"
      :time-picker="isTimePicker"
      :enable-time-picker="hasTimePicker"
      :placeholder="componentFormat"
      :disabled="field.readOnly"
      :readonly="field.readOnly"
      :aria-label="field.helpText"
      :title="field.helpText"
      :text-input="!field.readOnly"
      >
      <template #input-icon></template>
    </datetimepicker>
    <label v-if="undefinedCheck(field.suffix)">{{
      undefinedCheck(field.suffix)
    }}</label>
  </div>
</template>

<script lang="ts">
import {fieldMixins} from "./index";
import DateTimePicker from "vue3-date-time-picker";
import "vue3-date-time-picker/src/Vue3DatePicker/style/main.scss";

import {
  computed,
  defineComponent,
  onBeforeMount,
  PropType,
  reactive,
  ref,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";

export default defineComponent({
  name: "FormDateTime",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
    valueType: {
      type: String,
      required: false,
      default: "datetime",
    },
  },
  mixins: [fieldMixins],
  components: {
    datetimepicker: DateTimePicker,
  },
  emits: ["on-change"],
  setup(props, context) {
    const datetimeContainerClasses = computed(
      () =>
        `datetime-container ${props.classname}`
    );

    const hasTimePicker = computed(() =>
      props.valueType === "time" ||
      props.valueType === "datetime"
        ? true
        : false
    );

    const isTimePicker = computed(
      () => props.valueType === "time"
    );

    const daysOfTheWeek = 7;
    const settings = reactive({
      phrases: {
        ok: "Ok",
        cancel: "Cancel",
        next: "Next",
      },
      weekStart: props.field.weekStart
        ? props.field.weekStart
        : daysOfTheWeek,
      defaultlocale: props.field.locale
        ? props.field.locale
        : "en-US",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let valueRef = ref<any>();
    let currentValue = new Date(
      props.field.value
    );
    if (isTimePicker.value) {
      valueRef.value = {
        hours: currentValue.getHours(),
        minutes: currentValue.getMinutes(),
      };
    } else {
      valueRef.value = currentValue;
    }
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
      let dateValue;
      if (valueRef.value) {
        if (!(valueRef.value instanceof Date)) {
          const now = new Date();
          dateValue = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            valueRef.value.hours,
            valueRef.value.minutes,
            0
          );
        } else {
          dateValue = valueRef.value;
        }
      }

      let outputValue;
      const timezonOffset = 60000;
      if (dateValue) {
        outputValue = new Date(
          dateValue.getTime() -
            dateValue.getTimezoneOffset() *
              timezonOffset
        ).toJSON();
      }

      context.emit(
        "on-change",
        null,
        props.field,
        outputValue
      );
    }

    function checkLocale() {
      if (props.field.locale) {
        switch (
          props.field.locale.toLowerCase()
        ) {
          case "nl":
          case "nl-nl":
            settings.phrases = {
              ok: "Ok",
              cancel: "Annuleren",
              next: "Volgende",
            };
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
      isTimePicker,
      hasTimePicker,
    };
  },
});
</script>

<style lang="scss">
.datetime-container {
  margin-bottom: 15px;
  font-family: $font-primary;
  input {
    padding-left: 15px;
    &:read-only {
      cursor: not-allowed;
    }
  }
}
.dp__menu,
.dp__overlay,
.dp__cell_inner,
.dp__calendar,
.dp__time_display,
.dp__callendar_header_item {
  font-family: $font-primary;
}
/* Overwrites the datepicker defaults: https://vue3datepicker.com/customization/theming/  */
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-primary-color: #1481fe;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #3a52ac;
  --dp-success-color: #3a52ac;
  --dp-icon-color: #3a52ac;
  --dp-danger-color: #f00;
}
input:not([type="radio"]):not([class="vs__search"])[readonly] {
  border-radius: $b-radius-6;
}
</style>
