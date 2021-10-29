<template>
  <div :class="datetimeContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <datepicker
      v-model="valueRef"
      :type="valueType"
      :format="componentFormat"
      :phrases="settings.phrases"
      @change="handleChange"
    >
      <!-- <template slot="button-cancel">
        <a class="button-white">
          {{ settings.phrases.cancel }}
        </a>
      </template>
      <template
        slot="button-confirm"
        slot-scope="scope"
      >
        <a
          v-if="scope.step === &quot;date&quot;"
          class="button-primary"
        >
          {{ settings.phrases.next }}
        </a>
        <a
          v-else-if="scope.step === &quot;month&quot;"
          class="button-primary"
        >
        {{ settings.phrases.next }}
        </a>
        <a
          v-else
          class="button-primary"
        >
          {{ settings.phrases.ok }}
        </a>
      </template> -->
    </datepicker>
    <label v-if="undefinedCheck(field.suffix)">{{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>

<script lang="ts">
import { fieldMixins } from "./index";
import Datepicker  from "vue3-datepicker";

import { computed, defineComponent, onBeforeMount, PropType, reactive, ref } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  components: {
    "datepicker": Datepicker
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
    let valueRef = ref("");
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