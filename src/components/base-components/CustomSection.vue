<template>
  <th
    colspan="4"
    class="sectionHeader"
  >
    <h3
      :class="toggleChoice"
      @click="toggle($event)"
    >
      {{ field.title }}
    </h3>
    <span>
      <a
        v-if="field.canDeleteSection"
        href="" 
        class="list-btn icon-times"
        @click="removeFields($event)"
      />
      <a
        v-if="field.canToggleSection"
        href=""
        :class="getToggleClass"
        class="list-icon"
        @click="toggle($event)"        
      />
    </span>
  </th>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import SectionModel from "../../models/SectionModel";

export default defineComponent({
  name: "FormSection",
  props: {
    field: {
      type: Object as PropType<SectionModel>,
      required: true,
    },
  },
  emits: ["sortUp", "sortDown", "removeFields", "toggle"],
  setup(props, context) {
    function sortUp (e: Event) {
      e.preventDefault();
      context.emit("sortUp", e, props.field.formSection);
    }
    function sortDown(e: Event) {
        e.preventDefault();
        context.emit("sortDown", e, props.field.formSection);
    }
    const toggleChoice = computed(() => {
      return props.field.canToggleSection ? "toggle " : "";
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
        if (e)
        { e.preventDefault(); }
        if (props.field.canToggleSection) {
          context.emit("toggle", props.field.formSection);
        }
    }
    function getToggleClass() {
        // VISIBLE
        if (typeof (props.field.visible) === "undefined" || props.field.visible) {
            return "icon-angle-up";
        }
        else {
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
    };
  },
});
</script>

<style scoped lang="scss"></style>