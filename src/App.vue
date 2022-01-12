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
      () => store.getters["UI/openDrawer"]
    );
    const isLoggedIn = computed(
      () => store.getters["Authentication/isLoggedIn"]
    );
    return {
      openDrawer,
      isLoggedIn,
    };
  },
});
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";
</style>
