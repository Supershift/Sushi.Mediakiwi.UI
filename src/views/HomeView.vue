<template>
  <MainComponent v-if="isLayerMode" />
  <Drawer v-else>
    <template #drawer>
      <!-- You cam place something here to display below the list, inside the drawer -->
    </template>
    <template #content>
      <NavigationBar />
      <MainComponent />
    </template>
  </Drawer>
</template>

<script>
import {store} from "@/store";
import {
  defineComponent,
  defineAsyncComponent,
  computed,
} from "vue";
import MainComponent from "../components/Main.vue";

const Drawer = defineAsyncComponent(() =>
  import("./../components/drawer/Drawer.vue")
);
const NavigationBar = defineAsyncComponent(() =>
  import(
    "./../components/navigation/NavigationBar.vue"
  )
);

export default defineComponent({
  name: "HomeView",
  components: {
    MainComponent,
    Drawer,
    NavigationBar,
  },
  setup() {
    const isLayerMode = computed(
      () => store.getters.isLayerMode
    );
    return {
      isLayerMode,
    };
  },
});
</script>
