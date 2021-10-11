<template>
  <li :id="id">
      <fa :icon="icon" class="menu-icon" ></fa>
      <transition name="expand">
        <span v-show="openDrawer">{{ name }}</span>
      </transition>
  </li>
</template>

<script>
import { computed, defineComponent } from 'vue';
import store from '../store/index';

export default defineComponent({
  name: 'List Menu Item',
  props: {
    icon: {
      type: Array<String>([]),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const iconClass = computed(() => props.item.icon);
    const openDrawer = computed(() => store.getters.openDrawer);
    return {
      iconClass,
      openDrawer,
    };
  },
});
</script>

<style scoped lang="scss">
li {
    padding: 15px;
    color: white;
    background-color: transparent;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-width: 2px;
    border-image: $color-hover-blue-invis 1 20%;
    &:hover {
      background: $color-hover-blue-invis;
    }
    span {
        font-family: $font-primary;
    }
    .menu-icon {
        margin: 0 16px;
        height: 18px;
        width: 18px;
    }
}
</style>
