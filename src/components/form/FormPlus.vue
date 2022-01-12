<template>
  <div :class="plusContainerClasses">
    <a
      :id="fieldID"
      :class="plusClasses"
      @click="handleClick"
      :disabled="field?.disabled || field.isReadOnly"
      :aria-label="field.helpText"
      :title="field.helpText"
      :aria-readonly="field.isReadOnly"
      ><!-- eslint-disable-next-line vue/no-unregistered-components -->
      <fa icon="plus" class="plus-svg" />
    </a>
  </div>
</template>
<script lang="ts">
import {OutputExpressionTypeEnum} from "@/models/Mediakiwi/Enums";
import {
  PropType,
  computed,
  defineComponent,
} from "vue";
import {IField} from "../../models/Mediakiwi/Interfaces/IField";
import {fieldMixins} from "./../form";

export default defineComponent({
  name: "FormPlus",
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [fieldMixins],
  emits: ["plus-click"],
  setup(props, context) {
    const plusClasses = computed(() => {
      return [
        "plus-primary ",
        props.field.className,
        { " disabled": props.field.isReadOnly },
      ];
    });
    const plusContainerClasses = computed(() => {
      return [
        "plus-container " + props.classname,
      ];
    });
    const fieldID = computed(() => {
      return `${props.field.propertyName}_plus`;
    });
    const isHalf = computed(() => {
      return (
        props.field.expression !==
        OutputExpressionTypeEnum.full
      );
    });
    function handleClick(e: Event) {
      if (props.field.isReadOnly) {
        return;
      } else {
        context.emit("plus-click", e);
      }
    }
    return {
      plusClasses,
      fieldID,
      isHalf,
      handleClick,
      plusContainerClasses,
    };
  },
});
</script>

<style scoped lang="scss">
.plus-container {
  height: 50px;
  margin: 0 auto;
  margin-bottom: 15px;
  text-align: center;


  .disabled {
      cursor: not-allowed;
      opacity: 0.5;
  }
  .plus-svg {
    background: $color-success;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-shadow: 0 0 5px #000;
  }
  &.small {
    .plus-svg {
      width: 30px;
      height: 30px;
      font-size: $font-size-s;
    }
  }
}
</style>
