<template>
  <div class="navigation-bar ">
    <div class="navigation-content">
      <div class="navigation-logo">
        <fa icon="fingerprint" class="navigation-icon"></fa>
      </div>
      <h2>{{ siteTitle }}</h2>
      <NavigationMenu :items="navigationItems" />
    </div>
    <Profile/>
    <Notification />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import store from '../store/index';
import NavigationMenu from './NavigationMenu.vue';
import Profile from './Profile.vue';
import Notification from './Notification.vue';

export default defineComponent({
  name: 'Navigation Bar',
  props: {
    title: String,
    img: String,
    profile: Object,
  },
  components: {
    NavigationMenu,
    Profile,
    Notification,
  },
  setup() {
    const navigationItems = computed(() => store.getters.navigationItems);
    const siteTitle = computed(() => store.getters.siteTitle);
    return {
      navigationItems,
      siteTitle,
    };
  },
  computed: mapGetters('profile', ['getProfile']),
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
      &-icon{
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
</style>
