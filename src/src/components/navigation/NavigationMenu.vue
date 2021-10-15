<template>
  <ul :class="customClass">
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
  name: "Navigation Menu",
  props: {
    items: {
      type: Array,
      required: true,
    },
    class: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const customClass = computed(() => `${props.class} navigation-menu`);
    return {
      customClass,
    };
  },
  components: {
    NavigationMenuItem,
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
