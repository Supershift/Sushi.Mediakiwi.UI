<template>
  <div
    class="col"
    :class="sectionContainerClasses">
    <h3
      :class="toggleChoice"
      :aria-label="field.helpText"
      :title="field.helpText"
      @click="toggle($event)">
      {{ field?.title }}
    </h3>
    <span>
      <a
        v-if="field?.canDeleteSection"
        href=""
        class="list-btn icon-times"
        @click="removeFields($event)" />
      <a
        v-if="field?.canToggleSection"
        href=""
        :class="getToggleClass"
        class="list-icon"
        @click="toggle($event)" />
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from "vue";
import {IField} from "../../models/Mediakiwi/Interfaces";

export default defineComponent({
  name: "FormSection",
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
  emits: [
    "sort-up",
    "sort-down",
    "removeFields",
    "toggle",
  ],
  setup(props, context) {
    const sectionContainerClasses = computed(
      () => [
        "section-container " + props.classname,
      ]
    );
    function sortUp(e: Event) {
      e.preventDefault();
      context.emit(
        "sort-up",
        e,
        props.field.formSection
      );
    }
    function sortDown(e: Event) {
      e.preventDefault();
      context.emit(
        "sort-down",
        e,
        props.field.formSection
      );
    }
    const toggleChoice = computed(() => {
      return props.field?.canToggleSection
        ? "toggle "
        : "";
    });
    function removeFields(e: Event) {
      e.preventDefault();
      if (props.field.canDeleteSection) {
        // this.$dialog.confirm('Are you sure you want to delete this section')
        //     .then((dialog) => {
        //         console.log(`remove:${this.field.formSection}`);
        //         this.$parent.removeFields(this.field.formSection);
        //     });;
      }
      return false;
    }
    function toggle(e: Event) {
      if (e) {
        e.preventDefault();
      }
      if (props.field.canToggleSection) {
        context.emit(
          "toggle",
          props.field.formSection
        );
      }
    }
    function getToggleClass() {
      // VISIBLE
      if (
        typeof props.field.isHidden ===
          "undefined" ||
        props.field.isHidden
      ) {
        return "icon-angle-up";
      } else {
        return "icon-angle-down";
      }
    }
    return {
      sortUp,
      sortDown,
      removeFields,
      toggle,
      getToggleClass,
      toggleChoice,
      sectionContainerClasses,
    };
  },
});
</script>

<style scoped lang="scss">
.section-container {
  h3 {
    margin: 0;
  }
}
</style>
