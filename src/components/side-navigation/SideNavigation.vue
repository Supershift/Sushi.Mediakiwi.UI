<template>
  <ul :class="customContainerClass">
    <SideNavigationItem
      :key="topItem.text"
      :item="topItem"
    />
    <SideNavigationItem
      v-for="item in restOfItems"
      :key="item.text"
      :item="item"
    />
    <div class="side-nav-footer">
      <button
        class="btn btn-dialog-footer"
        @click="handleSignOut">
        <fa icon="sign-out"/><span v-if="isDrawerOpen"> Sign out</span> 
      </button>
    </div>
  </ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
} from "vue";
import SideNavigationItem from "./SideNavigationItem.vue";
import {store} from "@/store";
import { AuthenticationTypes } from "../../store/modules/Authentication";
import SideNavigationItemModel from "@/models/Mediakiwi/SideNavigationItemModel";

export default defineComponent({
  name: "SideNavigation",
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: { SideNavigationItem },
  setup(props) {
    const isDrawerOpen = computed(
      () => store.getters["UI/isDrawerOpen"],
    );
    const customContainerClass = computed(
      () => `list-menu ${props.customClass}`
    );
    const sideNavigationItems = computed(
      () => store.getters["Navigation/sideNavigationItems"]
    );
    const topItem = computed(() => {
      return sideNavigationItems.value.find((a: SideNavigationItemModel) => a.isBack )
    })
    const restOfItems = computed(() => {
      return sideNavigationItems.value.filter((b: SideNavigationItemModel) => !b.isBack )
    })
    function handleSignOut() {
      store.dispatch(AuthenticationTypes.UNAUTHENTICATE);
    }
    return {
      customContainerClass,
      sideNavigationItems,
      isDrawerOpen,
      restOfItems,
      topItem,
      handleSignOut,
    };
  },
});
</script>

<style scoped lang="scss">
.list-menu {
  position: relative;
  padding: 0;
  list-style-type: none;
  margin: 0;
  z-index: 21;
  height: 100%;
}

.side-nav-footer {
  padding: 15px;
  border-radius: 0 0 $b-radius-6 $b-radius-6;
  position: absolute;
  bottom: 150px;
  width: fit-content;
  .btn {
    padding: 15px;
    width: 100%;
  }
  a {
    color: $color-lightblue;
  }
}
@media (min-width: 980px) {
  .side-nav-footer {
    display: none;
  }
}
</style>