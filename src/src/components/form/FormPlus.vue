<template>
  <a
    :id="fieldID"
    :class="plusClasses"
    @click="handleClick" 
  >
    <fa icon="plus" class="plusBtn" />
  </a>
</template>
<script lang="ts">
import { PropType, computed, defineComponent  } from "vue";
import FieldModel from "../../models/FieldModel";
import { fieldMixins, ExpressionType } from "./../form";

export default defineComponent({
  name: "Plus",  
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
  },
  setup(props, context) {
    const plusClasses = computed(() => { return ["plus-primary " + props.classname]; });
    const fieldID = computed(() => { return`${props.field.propertyName}_plus`; });
    const isHalf = computed(() => {
        return props.field.expression !== ExpressionType.Full;
    });
    function handleClick(e: Event) {
      context.emit("clicked", e);
    }
    return {
      plusClasses,
      fieldID,
      isHalf,
      handleClick,
    };
  },
});
</script>

<style scoped lang="scss">

.plusBtn {
    margin: 0 auto;
    margin-top: $grid-s-gutter;
    background: $color-success;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: $font-size-s;

    &.small {
        width: 30px;
        height: 30px;
        font-size: 11px;
    }

    &:before {
        display: block;
    }
}
</style>
