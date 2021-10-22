<template>
  <div :class="selectContainerClasses">
    <label
      v-if="undefinedCheck(select.prefix)"
      class="select-prefix"
    >
      {{ undefinedCheck(select.prefix) }}
    </label>
    <fa
      v-if="select.fieldIcon"
      :icon="fieldIconChoice"
      class="select-icon"
    />
    <label
      :for="select.fieldName"
      class="select-label"
    >
      <select
        :id="id"
        :name="select.fieldName"
        :disabled="select.disabled"
        :value="selectedValueState"
        :class="customSelectClasses"
        @change="$emit('selectValueChanged', selectedValueState)"
      >
        <option
          v-if="select.showDefault"
          value
          disabled
          selected
        >
          {{ select.defaultLabel }}
        </option>
        <option
          v-for="(opt, index) in select.options"
          :key="index"
          :value="opt.value"
        >
          {{ opt.name }}
          <span
            v-if="opt.countForOption"
          >
            ({{ opt.countForOption }})
          </span>
        </option>
      </select>
    </label>
    <label
      v-if="undefinedCheck(select.suffix)"
      class="select-suffix"
    >
      {{ undefinedCheck(select.suffix) }}
    </label>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import SelectModel from "../../models/SelectModel";
import { useCheckUndefined } from "../form/index";

export default defineComponent({
  name: "FormSelect",
  mixins: [useCheckUndefined],
  props: {
    select: {
      type: Object as PropType<SelectModel>,
      required: true,
    },
  },
  emits: ["selectValueChanged"],
  setup(props) {
    const selectedValueState = ref<number>();
    const id = computed(() => `_${props.select.customClass}-${props.select.fieldName}`);
    const customSelectClasses = computed(() => ["select-container ", props.select.customClass]);
    const selectContainerClasses = computed(() => {
      let iconColor: string;
      switch (props.select.fieldIcon) {
        case "email":
          iconColor = "normal";
          break;
        case "password":
          iconColor = "alert";
          break;
        case "warning":
          iconColor = "warn";
          break;
        case "key":
          iconColor = "normal";
          break;
        case "finger":
          iconColor = "normal";
          break;
        default:
          iconColor = "normal";
          break;
      }
      return ["input-container ", iconColor];
    });
    const fieldIconChoice = computed(() => {
      let icon: string[];
      switch (props.select.fieldIcon) {
        case "email":
          icon = ["fal", "at"];
          break;
        case "password":
          icon = ["fal", "lock-alt"];
          break;
        case "warning":
          icon = ["fal", "exclamation-triangle"];
          break;
        case "key":
          icon = ["fal", "key"];
          break;
        case "finger":
          icon = ["fal", "fingerprint"];
          break;
        default:
          icon = [""];
          break;
      }
      return icon;
    });
    return {
      id,
      selectContainerClasses,
      customSelectClasses,
      selectedValueState,
      fieldIconChoice,
    };
  },
});
</script>

<style scoped lang="scss">
.select-container {
  position: relative;
  height: 50px;
  .select-icon {
    position: absolute;
    top: 18px;
    left: 15px;
  }
  .select-suffix {
    position: absolute;
    right: -60px;
    top: 14px;
    color: $color-alert;
    font-size: $font-size-xxl;
  }
  .select-suffix {
    position: absolute;
    right: -60px;
    top: 14px;
    color: $color-alert;
    font-size: $font-size-xxl;
  }
}
.normal {
  .select-icon {
    color: $color-blue;
  }
}
.alert {
  .select-icon {
    color: $color-alert;
  }
}
.select-label {
  display: block;
  font-weight: bold;
  text-align: center;
  .select-primary {
      border: none;
      height: 50px;
      line-height: 40px;
      width: 100%;
      border-radius: 3px;
      padding-left: 35px;
      padding-right: 35px;
      font-size: $font-size-l;
      color: $color-drakgrey;
      border: 1px solid $color-drakgrey;
  }
}
</style>
