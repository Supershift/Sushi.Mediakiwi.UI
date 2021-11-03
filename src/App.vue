<template>
  <router-view />
</template>

<script>
import {computed, defineComponent} from "vue";
import {store} from "@/store";

export default defineComponent({
  name: "App",
  setup() {
    const openDrawer = computed(
      () => store.getters.openDrawer
    );
    const isLoggedIn = computed(
      () => store.getters.isLoggedIn
    );
    return {
      openDrawer,
      isLoggedIn,
    };
  },
});
</script>

<style scoped lang="scss"></style>
