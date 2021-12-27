<template>
  <div class="drawer-container">
    <!-- Sidebar -->
    <transition name="expand">
      <div :class="positionCss + collapsableCss" data-container="sidebar">
        <div
          class="brand-container"
          @click="handleToggle">
          <img
            src="../../assets/images/leftnav-bg-grad.png"
            class="topleft-nav-gradient" />
          <div class="logo-container">
            <transition name="fade">
              <img
                :src="logoSrc"
                :class="logoCss" />
            </transition>
            <!-- Global component -->
            <!-- eslint-disable-next-line vue/no-unregistered-components -->
            <fa
              :icon="chevronChoice"
              class="drawer-icon" />
          </div>
        </div>
        <SideNavigation
          :custom-class="customListClass" />
        <slot
          name="drawer" /><!-- Drawer opener -->
      </div>
    </transition>
    <div class="slot-content-container" data-container="content" >
      <slot
        name="content" /><!-- Drawer content -->
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
} from "vue";
import {store} from "@/store";
import SideNavigation from "../side-navigation/SideNavigation.vue";
import logoS from "../../assets/images/mk-icon.png";
import logoL from "../../assets/images/mk-logo.png";
import { UITypes } from "../../store/modules/UI";

export default defineComponent({
  name: "DrawerComponent",
  props: {
    toggler: {
      type: Boolean,
      required: false,
    },
    right: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    SideNavigation,
  },
  setup(props) {
    const open = ref(props.toggler);
    const customListClass = ref("side-list-menu");
    const positionCss = computed(() =>
      props.right
        ? ["sidebar-container right-0 flex-row "]
        : [
            "sidebar-container left-0 flex-row-reverse ",
          ]
    );
    const collapsableCss = computed(() =>
      open.value ? ["open-drawer "] : [""]
    );
    const chevronChoice = computed(() =>
      !open.value
        ? "chevron-right"
        : "chevron-left"
    );
    const logoSrc = computed(() =>
      !open.value ? logoS : logoL
    );
    const logoCss = computed(() =>
      !open.value
        ? "logo-small "
        : "logo-small logo-large"
    );
    function handleToggle() {
      open.value = !open.value;
      store.dispatch(UITypes.SET_DRAWER_OPEN, open.value);
    }
    return {
      positionCss,
      collapsableCss,
      chevronChoice,
      logoSrc,
      logoCss,
      open,
      customListClass,
      handleToggle,
    };
  },
});
</script>

<style scoped lang="scss">
.drawer-container {
  position: fixed;
  display: flex;
  z-index: 40;
  height: 100%;
  width: 100%;
  .sidebar-container {
    transition: max-height 0.25s ease-in-out;
    transition-property: width;
    max-height: 100vh;
    width: 80px;
    background-color: $color-main;
    z-index: 20;
  }
  .slot-content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .open-drawer ~ .slot-content-container {
    width: 0%;
  }
  .open-drawer {
    transition: max-height 0.25s ease-in-out;
    transition-duration: 0.25s;
    transition-property: width;
    width: 100%;
    .topleft-nav-gradient {
      transition: width 0.25s ease-in-out;
      transition-property: left;
      transition-duration: 0.25s;
      left: -80px;
    }
    .drawer-icon {
      transition: max-height 0.1s ease-in-out;
      transition-delay: 0.1s;
      transition-property: margin-left;
      margin-left: 45px;
    }
  }
}
.brand-container {
  position: relative;
  height: 115px;
  cursor: pointer;
  z-index: 21;
}
.logo-container {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 15px;
  left: 20px;
  top: 30px;
  z-index: 20;
  .logo {
    &-small {
      transition: width 0.25s ease-in-out;
      height: 38px;
      width: 38px;
    }
    &-large {
      transition: width 0.25s ease-in-out;
      width: 145px;
    }
  }
  .drawer-icon {
    transition: max-height 0.15s ease-in-out;
    transition-delay: 0.15s;
    transition-property: margin-left;
    color: white;
    height: 10px;
    width: 10px;
    margin-left: 0;
  }
}

.topleft-nav-gradient {
  transition: width 0.25s ease-in-out;
  transition-property: left;
  transition-duration: 0.25s;
  width: 330px;
  position: absolute;
  top: 0px;
  left: -200px;
  z-index: 19;
  cursor: default;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (min-width: 480px) {
  .drawer-container{
    .open-drawer{
      width: 225px;
    }
    .slot-content-container[data-container="content"] {
      width: -webkit-fill-available;
    }
  }
}
</style>
