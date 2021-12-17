<template>
  <ul :class="customContainerClass">
    <SideNavigationItem
      v-for="item in sideNavigationItems.items"
      :key="item.text"
      :item="item"
    />
    <div class="side-nav-footer">
      <button
        class="btn btn-dialog-footer"
        @click="handleSignOut">
        <fa icon="sign-out"/><span v-if="drawerIsOpen"> Sign out</span> 
      </button>
    </div>
  </ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
} from "vue";
import SideNavigationItem from "./SideNavigationItem.vue";
import {store} from "@/store";
export default defineComponent({
  name: "SideNavigation",
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {SideNavigationItem},
  setup(props) {
    onMounted(() => {
      store.dispatch("loadSideNavigation");
    });
    const drawerIsOpen = computed(
      () => store.getters.openDrawer,
    );
    const customContainerClass = computed(
      () => `list-menu ${props.customClass}`
    );
    const sideNavigationItems = computed(
      () => store.getters.sideNavigationItems
    );
    function handleSignOut() {
      store.dispatch("signOut");
    }
    return {
      customContainerClass,
      sideNavigationItems,
      drawerIsOpen,
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