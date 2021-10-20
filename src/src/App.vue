<template>
  <Drawer
    v-if="isLoggedIn"
    :toggler="openDrawer"
  >
    <template #drawer>
      <!-- You cam place something here to display below the list, inside the drawer -->
    </template>
    <template #content>
      <NavigationBar />
      <Main />
    </template>
  </Drawer>
  <router-view v-else />
</template>

<script>
import { computed, defineComponent, defineAsyncComponent } from "vue";
import store from "./store/index";

const Drawer = defineAsyncComponent(() => import("./components/drawer/Drawer.vue"));
const Main = defineAsyncComponent(() => import("./components/Main.vue"));
const NavigationBar = defineAsyncComponent(() => import("./components/navigation/NavigationBar.vue"));

export default defineComponent({
  name: "App",
  components: {
    Drawer,
    NavigationBar,
    Main,
  },
  setup() {
    const openDrawer = computed(() => store.getters.openDrawer);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    return {
      openDrawer,
      isLoggedIn,
    };
  },
});
</script>

<style scoped lang="scss"></style>
