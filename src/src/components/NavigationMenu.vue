<template>
  <ul :class="customClass">
    <navigation-menu-item v-for="item in items"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    ></navigation-menu-item>
  </ul>
</template>

<script>
import { defineComponent, computed } from 'vue';
import NavigationMenuItem from './NavigationMenuItem.vue';

export default defineComponent({
  name: 'Navigation Menu',
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
}
</style>
