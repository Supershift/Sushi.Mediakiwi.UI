<template>
  <div :class="plusContainerClasses">
    <a
      :id="fieldID"
      :class="plusClasses"
      @click="handleClick" 
    >
      <fa icon="plus" class="plus-svg" />
    </a>
</div>
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
    const plusClasses = computed(() => { return ["plus-primary " + props.field.className]; });
    const plusContainerClasses = computed(() => { return ["plus-container " + props.classname]; });
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
  .plus-svg {
    background: $color-success;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
   &.small {
      .plus-svg{
        width: 30px;
        height: 30px;
        font-size: $font-size-s;
      }
    }

}
</style>
