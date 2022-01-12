<template>
  <ul :class="customListClass">
    <NavigationMenuItem
      v-for="item in items"
      :key="item.id"
      :item="item" />
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
} from "vue";
import NavigationMenuItem from "./NavigationMenuItem.vue";
import {INavigationItem} from "../../models/Mediakiwi/Interfaces";

export default defineComponent({
  name: "NavigationMenu",
  props: {
    items: {
      type: Array as PropType<
        Array<INavigationItem>
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 786px) {
  .navigation-menu {
    position: absolute;
    flex-direction: row;
    align-items: unset;
    width: unset;
    height: 50px;
    bottom: 0;
    left: 160px;
    margin-left: -15px;
  }
  
}
</style>
