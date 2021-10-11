<template>
<Drawer :toggler="openDrawer">
  <template v-slot:drawer>
      <!-- You cam place something here to display below the list, inside the drawer -->
  </template>
  <template v-slot:content>
      <NavigationBar />
      <Main/>
  </template>
</Drawer>
</template>

<script>
import { computed } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import store from './store/index';
import Drawer from './components/Drawer.vue';
import Main from './components/Main.vue';

export default {
  name: 'Start',
  setup() {
    const openDrawer = computed(() => store.getters.openDrawer);
    return {
      openDrawer,
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
