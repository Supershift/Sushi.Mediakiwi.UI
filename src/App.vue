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

    // eslint-disable-next-line no-console
    console.log("VUE_APP_MEDIAKIWI_API_KEY:", process.env.VUE_APP_MEDIAKIWI_API_KEY)

    return {
      openDrawer,
      isLoggedIn,
    };
  },
});
</script>
