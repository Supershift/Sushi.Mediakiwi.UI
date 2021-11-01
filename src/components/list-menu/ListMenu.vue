<template>
  <ul :class="customContainerClass">
    <ListMenuItem
      v-for="item in menuItems"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :icon="item.icon"
      :toggler="showText"
    />
  </ul>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import ListMenuItem from "./ListMenuItem.vue";
import store from "../../store/index";

export default defineComponent({
  name:"ListMenu",
  components: { ListMenuItem },
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const customContainerClass = computed(() => `${props.customClass} `);
    const menuItems = computed(() => store.getters.menuItems);
    const showText = ref(props.toggler);
    return {
      customContainerClass,
      showText,
      menuItems,
    };
  },
});
</script>

<style scoped lang="scss"></style>
