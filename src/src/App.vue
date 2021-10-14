<template>
<Drawer :toggler="openDrawer" v-if="isLoggedIn">
  <template v-slot:drawer>
      <!-- You cam place something here to display below the list, inside the drawer -->
  </template>
  <template v-slot:content>
      <NavigationBar />
      <Main/>
  </template>
</Drawer>
<router-view v-else />
</template>

<script>
import { computed, defineComponent, defineAsyncComponent } from 'vue';
import store from './store/index';

const Drawer = defineAsyncComponent(() => import('./components/drawer/Drawer.vue'));
const Main = defineAsyncComponent(() => import('./components/Main.vue'));
const NavigationBar = defineAsyncComponent(() => import('./components/navigation/NavigationBar.vue'));

export default defineComponent({
  name: 'App',
  setup() {
    const openDrawer = computed(() => store.getters.openDrawer);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    return {
      openDrawer,
      isLoggedIn,
    };
  },
  components: {
    Drawer,
    NavigationBar,
    Main,
  },
  created() {
    document.title = 'VaultN';
  },
});
</script>

<style scoped lang="scss"></style>
