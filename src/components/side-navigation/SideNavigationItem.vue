<template>
  <li :id="item.id" :class="classes">
    <transition name="expand">
      <a :href="item.href">
        <!-- Global component -->
        <!-- eslint-disable-next-line vue/no-unregistered-components -->
        <fa
          class="menu-icon"
          :icon="icons"
          v-if="icons" />
        <span v-show="isDrawerOpen">{{
          item.text
        }}</span>
      </a>
    </transition>
    <ul v-if="item.items && item.items.length">
      <SideNavigationItem
        v-for="subItem in item.items"
        :key="subItem.text"
        :item="subItem" />
    </ul>
  </li>
</template>

<script lang="ts">
import {store} from "@/store";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";
import SideNavigationItemModel from "@/models/Mediakiwi/SideNavigationItemModel";

export default defineComponent({
  name: "SideNavigationItem",
  props: {
    item: {
      type: Object as PropType<SideNavigationItemModel>,
      required: true,
    },
  },
  setup(props) {
    const icons = computed(() =>
      props.item.iconClass
        ? props.item.iconClass.split(" ")
        : "kiwi-bird"
    );

    const isDrawerOpen = computed(
      () => store.getters["UI/isDrawerOpen"]
    );
    const classes = computed(() => {
      return {
        active: props.item.isActive,
        back: props.item.isBack,
      };
    });
    return {
      icons,
      isDrawerOpen,
      classes,
    };
  },
});
</script>

<style scoped lang="scss">
li {
  &.active {
    > a {
      background: $color-hover-blue-invis;
    }
  }

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
}
</style>

<style lang="scss">
.sidebar-container {
  &.open-drawer {
    li ul li a {
      padding-left: 40px;
    }
  }
}
</style>
