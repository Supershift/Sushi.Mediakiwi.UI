<template>
  <ul :class="customListClass">
    <NavigationMenuItem
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :text="item.text" />
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
} from "vue";
import NavigationMenuItem from "./NavigationMenuItem.vue";
import TopNavigationItemModel from "@/models/Mediakiwi/TopNavigationItemModel";

export default defineComponent({
  name: "NavigationMenu",
  props: {
    items: {
      type: Array as PropType<
        Array<TopNavigationItemModel>
      >,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    NavigationMenuItem,
  },
  setup(props) {
    const customListClass = computed(
      () => `${props.customClass} navigation-menu`
    );
    return {
      customListClass,
    };
  },
});
</script>

<style scoped lang="scss">
.navigation-menu {
  position: absolute;
  bottom: 4px;
  left: 160px;
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-left: -15px;
}
</style>
