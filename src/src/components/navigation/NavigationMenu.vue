<template>
  <ul :class="customListClass">
    <NavigationMenuItem
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :name="item.name"
    />
  </ul>
</template>

<script>
import { defineComponent, computed } from "vue";
import NavigationMenuItem from "./NavigationMenuItem.vue";

export default defineComponent({
  name: "NavigationMenu",
  components: {
    NavigationMenuItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const customListClass = computed(() => `${props.class} navigation-menu`);
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
