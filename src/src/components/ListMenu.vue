<template>
  <ul :class="customClass">
    <ListMenuItem v-for="item in items"
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

export default defineComponent({
  components: { ListMenuItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    class: {
      type: String,
      required: false,
    },
    toggler: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const customClass = computed(() => `${props.class} `);
    const showText = ref(props.toggler);
    return {
      customClass,
      showText,
    };
  },
});
</script>
<style lang="scss">
ul {
    padding: 0;
    list-style-type: none;
    margin: 0;
}
</style>
