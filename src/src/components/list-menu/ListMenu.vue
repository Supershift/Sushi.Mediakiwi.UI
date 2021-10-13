<template>
  <ul :class="customClass">
    <ListMenuItem v-for="item in menuItems"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :icon="item.icon"
    :toggler="showText"></ListMenuItem>
  </ul>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import ListMenuItem from './ListMenuItem.vue';
import store from '../../store/index';

export default defineComponent({
  components: { ListMenuItem },
  props: {
    class: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const customClass = computed(() => `${props.class} `);
    const menuItems = computed(() => store.getters.menuItems);
    const showText = ref(props.toggler);
    return {
      customClass,
      showText,
      menuItems,
    };
  },
});
</script>

<style scoped lang="scss"></style>
