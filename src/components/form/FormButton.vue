<template>
  <a
    v-if="field?.url"
    :class="customButtonClasses"
    :href="field?.url"
    :aria-label="field?.helpText"
    :title="field?.helpText"
    :id="field?.propertyName"
    :disabled="
      field?.isReadOnly
    ">
    {{ field?.title }}
  </a>
  <button
    v-else
    :class="customButtonClasses"
    @click.prevent="handleClicked"
    :title="field?.helpText"
    :aria-label="field?.helpText"
    :id="field?.propertyName"
    :value="field?.title"
    :disabled="
      field?.isReadOnly
    ">
    {{ field?.title }}
  </button>

</template>

<script lang="ts">
import {ButtonModel} from "../../models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";

export default defineComponent({
  name: "FormButton",
  props: {
    field: {
      type: Object as PropType<ButtonModel>,
      required: true,
    },
  },
  emits: ["button-clicked"],
  setup(props, context) {
    const customButtonClasses = computed(() => {
      return ["btn ", props.field?.className, props.field?.isPrimary ? "btn-primary" : ""]});
    // const buttonIconChoice = computed(() => ["fal", props.button.iconClass]);
    function handleClicked() {
      context.emit(
        "button-clicked",
        props.field
      );
    }
    return {
      customButtonClasses,
      // buttonIconChoice,
      handleClicked,
    };
  },
});
</script>

<style scoped lang="scss">
.btn {
  text-decoration: none;
  display: inline-block;
  font-family: $font-primary;
  font-size: $font-size-base;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: $color-main;
    }
  }
}
.btn-icon {
  padding-right: 15px;
}
.right {
  margin-left: 10px;
}
.left {
  margin-right: 10px;
}
</style>
