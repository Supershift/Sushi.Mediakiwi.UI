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
  .navigation-content {
    font-family: $font-primary;
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: left;
    padding-top: 15px;
  }
  .navigation {
    &-logo {
      display: none;
      width: 60px;
      height: 60px;
      border-radius: 6px;
      color: #2aa1e8;
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
    text-align: center;
  }
}

.navigation-settings {
  color: #2aa1e8;
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  margin-top: 5px;
}

@media (min-width: 786px) {
  .navigation-bar {
    height: 90px;
    .navigation-content {
      flex-direction: row;
      padding: 15px;
      padding-left: 80px;
    }
    .navigation-logo {
      display: block;
    }
    h2 {
      padding-left: 15px;
      z-index: 999;
    }
  }
}
</style>
