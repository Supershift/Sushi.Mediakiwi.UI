<!-- eslint-disable vue/no-unregistered-components -->
<template>
  <div class="navigation-bar">
    <div class="navigation-content">
      <div class="navigation-logo">
        <fa
          icon="fingerprint"
          class="navigation-icon" />
      </div>
      <h2>{{ pageTitle }}</h2>
      <a
        v-if="pageSettings"
        :href="pageSettings"
        class="navigation-settings">
        <fa icon="cogs" />
      </a>
      <NavigationMenu
        :items="topNavigationItems" />
    </div>
    <Profile />
    <Notification />
    <DialogComponent />
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {store} from "@/store";
import NavigationMenu from "./NavigationMenu.vue";
import Profile from "./Profile.vue";
import Notification from "../notification/Notification.vue";
import DialogComponent from "../dialog/Dialog.vue";

export default defineComponent({
  name: "NavigationBar",
  components: {
    NavigationMenu,
    Profile,
    Notification,
    DialogComponent,
  },
  setup() {
    const topNavigationItems = computed(
      () => store.getters.topNavigationItems
    );
    const pageTitle = computed(() =>
      store.getters.page
        ? store.getters.page.title
        : ""
    );
    const pageSettings = computed(() =>
      store.getters.page
        ? store.getters.page.settingsUrl
        : ""
    );
    return {
      topNavigationItems,
      pageTitle,
      pageSettings,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navigation-bar {
  border-bottom: 1px solid #2aa1e8;
  width: 100%;
  height: 90px;
  .navigation-content {
    font-family: "Rajdhani", "Arial", Sans-serif;
    display: flex;
    flex-direction: row;
    position: relative;
    text-align: left;
    padding: 15px;
    padding-left: 80px;
  }
  .navigation {
    &-logo {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      color: #2aa1e8;
      border: 2px solid $color-blue;
      flex: 0 0 60px;
    }
    &-icon {
      height: 32px;
      width: 32px;
      margin: 15px;
    }
  }
  h2 {
    margin: 0;
    display: inline-block;
    vertical-align: top;
    padding-left: 15px;
  }
}

.navigation-settings {
  color: #2aa1e8;
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
