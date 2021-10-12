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
import { computed } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import store from './store/index';
import Drawer from './components/Drawer.vue';
import Main from './components/Main.vue';

export default {
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
};
</script>

<style scoped lang="scss"></style>
