<template>
  <div :class="plusContainerClasses">
    <a
      :id="fieldID"
      :class="plusClasses"
      @click="handleClick"
      :readonly="
        field?.disabled || field.readOnly
      "
      ><!-- eslint-disable-next-line vue/no-unregistered-components -->
      <fa icon="plus" class="plus-svg" />
    </a>
  </div>
</template>
<script lang="ts">
import {OutputExpressionType} from "@/models/Mediakiwi/OutputExpressionType";
import {
  PropType,
  computed,
  defineComponent,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";
import {fieldMixins} from "./../form";

export default defineComponent({
  name: "FormPlus",
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
  mixins: [fieldMixins],
  setup(props, context) {
    const plusClasses = computed(() => {
      return [
        "plus-primary " + props.field.className,
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
        OutputExpressionType.full
      );
    });
    function handleClick(e: Event) {
      context.emit("clicked", e);
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

  .plus-primary {
    &:read-only .plus-svg {
      cursor: not-allowed;
      opacity: 0.5;
    }
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
