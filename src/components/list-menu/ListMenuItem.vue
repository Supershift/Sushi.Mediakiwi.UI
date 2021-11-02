<template>
  <li :id="id">
    <transition name="expand">
      <a :href="href">
        <!-- Global component -->
        <!-- eslint-disable-next-line vue/no-unregistered-components -->
        <fa class="menu-icon" :icon="icons" />
        <span v-show="openDrawer">{{
          text
        }}</span>
      </a>
    </transition>
  </li>
</template>

<script>
import {store} from "@/store";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ListMenuItem",
  props: {
    iconClass: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    text: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const icons = computed(() =>
      props.iconClass.split(" ")
    );

    const openDrawer = computed(
      () => store.getters.openDrawer
    );
    return {
      icons,
      openDrawer,
    };
  },
});
</script>

<style scoped lang="scss">
a {
  padding: 15px;
  color: white;
  background-color: transparent;
  border-bottom: 2px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image: $color-hover-blue-invis 1 20%;
  display: block;
  text-decoration: none;
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
