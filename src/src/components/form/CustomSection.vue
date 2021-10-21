<template>
  <th
    colspan="4"
    class="sectionHeader"
  >
    <h3
      @click="toggle($event)"
      v-html="field.title"
      :class="{'toggle' : field.canToggleSection}"
    ></h3>
    <span>
        <a
          v-if="field.canDeleteSection"
          href="" 
          @click="removeFields($event)"
          class="list-btn icon-times"
        />
        <a
          v-if="field.canToggleSection"
          href=""
          @click="toggle($event)"
          class="list-icon"
          :class="getToggleClass"
        />
    </span>
  </th>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
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
    function removeFields(e) {
        e.preventDefault();
        if (this.field.canDeleteSection) {
            // this.$dialog.confirm('Are you sure you want to delete this section')
            //     .then((dialog) => {
            //         console.log(`remove:${this.field.formSection}`);
            //         this.$parent.removeFields(this.field.formSection);
            //     });;
        }
        return false;
    }
    function toggle(e) {
        if (e)
          e.preventDefault();
        if (this.field.canToggleSection) {
          context.emit("toggle", props.field.formSection);
        }
    }
    function getToggleClass() {
        // VISIBLE
        if (typeof (this.field.visible) === "undefined" || this.field.visible) {
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
    };
  },
});
</script>

<style scoped lang="scss"></style>