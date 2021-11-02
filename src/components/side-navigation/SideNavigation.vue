<template>
  <ul :class="customContainerClass">
    <SideNavigationItem
      v-for="item in sideNavigationItems"
      :id="item.id"
      :key="item.id"
      :text="item.text"
      :href="item.href"
      :icon-class="item.iconClass"
      :toggler="showText" />
  </ul>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
} from "vue";
import SideNavigationItem from "./SideNavigationItem.vue";
import {store} from "@/store";
export default defineComponent({
  name: "SideNavigation",
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {SideNavigationItem},
  setup(props) {
    const customContainerClass = computed(
      () => `${props.customClass} `
    );
    const sideNavigationItems = computed(
      () => store.getters.sideNavigationItems
    );
    const showText = ref(props.toggler);
    return {
      customContainerClass,
      showText,
      sideNavigationItems,
    };
  },
});
</script>
