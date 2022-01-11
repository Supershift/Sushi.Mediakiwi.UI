<template>
<transition name="fade">
  <div
    v-if="notification"
    class="notification-container"
    @click="hideNotification">
    <div
      class="notification-bubble"
      :class="alertCss">
      <fa
        icon="sort-up"
        :class="chevronPosition" />
      <div class="notification-bubble-content">
        <fa :icon="iconChoice" />
        {{ notification.message }}
        <button
          v-if="notification.hasAction"
          class="btn btn-notification"
          @click.prevent="handleClick">
          {{ notification.actionText }}
        </button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import {computed, defineComponent, onMounted} from "vue";
import { NotificationActionTypes } from "../../utils/utils";
import {store} from "@/store";
import { UITypes } from "../../store/modules/UI";
export default defineComponent({
  name: "NotificationComponent",
  props:{
    position: {
      type: String,
      default: "top-right",
    },
  },
  emits: ["notification-action"],
  setup(props) {
    const waitForFadeOut = 5000;
    const notification = computed(
      () => store.getters["UI/notification"]
    );
    const chevronPosition = computed(() => {
      let positionCss = "notification-top-icon ";
      switch (props.position) {
        case "top-right":
          positionCss += "top-right";
          break;
        case "top-center":
          positionCss += "top-center";
          break;
        case "top-left":
          positionCss += "top-left";
          break;
        case "bottom-right":
          positionCss += "bottom-right";
          break;
        case "bottom-center":
          positionCss += "bottom-center";
          break;
        case "bottom-left":
          positionCss += "bottom-left";
          break;
        default:
          positionCss += "top-right";
          break;
      }
      return positionCss;
    });
    const iconChoice = computed(() => {
      let icon = "";
      switch (notification.value.actionType) {
        case NotificationActionTypes.SUCCESS:
          icon = ["fal", "check-circle"];
          break;
        case NotificationActionTypes.INFO:
          icon = ["fal", "exclamation-circle"];
          break;
        case NotificationActionTypes.WARNING:
          icon = ["fal", "exclamation-triangle"];
          break;
        case NotificationActionTypes.CHANGE:
          icon = ["fal", "exchange-alt"];
          break;
        case NotificationActionTypes.ALERT:
          icon = ["fal", "hand-paper"];
          break;
        default:
          icon = ["fal", "exclamation-circle"];
          break;
      }
      return icon;
    });
    const alertCss = computed(() => {
      let alertColor = "";
      switch (notification.value.actionType) {
        case NotificationActionTypes.SUCCESS:
          alertColor = "notification-success ";
          break;
        case NotificationActionTypes.INFO:
          alertColor = "notification-info ";
          break;
        case NotificationActionTypes.WARNING:
          alertColor = "notification-warning ";
          break;
        case NotificationActionTypes.CHANGE:
          alertColor = "notification-change ";
          break;
        case NotificationActionTypes.ALERT:
          alertColor = "notification-alert ";
          break;
        default:
          alertColor = "notification-alert ";
          break;
      }
      return alertColor;
    });
    function hideNotification() {
      store.dispatch(UITypes.TOGGLE_NOTIFICATION, false);
    }
    function handleClick() {
      store.dispatch(UITypes.SET_NOTIFICATION, false);
    }
    onMounted(() => {
      setTimeout(() => {
        store.dispatch(UITypes.SET_NOTIFICATION, false);
      }, waitForFadeOut);
    });
    return {
      iconChoice,
      notification,
      alertCss,
      chevronPosition,
      hideNotification,
      handleClick,
    };
  },
});
</script>

<style scoped lang="scss">
.notification-container {
  position: absolute;
  width: max-content;
  cursor: pointer;
  right: 30px;
  top: 100px;
  .notification-bubble {
    position: relative;
    .notification-top-icon {
      position: absolute;
      color: $color-success;
      transform: scale(1.75);
    }
    .top{
      &-right{
        top: -5px;
        right: 38px;
      }
      &-left{
        top: -5px;
        right: 38px;
      }
      &-center{
        top: -5px;
        left: 50%;
      }
    }
    .bottom{
      &-right{
        bottom: -5px;
        right: 38px;
      }
      &-left{
        bottom: -5px;
        right: 38px;
      }
      &-center{
        bottom: -5px;
        left: 50%;
      }
    }
    .notification-bubble-content {
      background: $color-success;
      color: white;
      border-radius: 10px;
      padding: 15px;
      font-family: $font-primary;
      letter-spacing: 1.5px;
    }
  }
  .notification- {
    &success {
      .notification-top-icon {
        color: $color-success;
      }
      .notification-bubble-content {
        background: $color-grad-success;
      }
    }
    &info {
      .notification-top-icon {
        color: $color-info;
      }
      .notification-bubble-content {
        background: $color-grad-info;
      }
    }
    &warning {
      .notification-top-icon {
        color: $color-warning;
      }
      .notification-bubble-content {
        background: $color-grad-warning;
      }
    }
    &alert {
      .notification-top-icon {
        color: $color-alert;
      }
      .notification-bubble-content {
        background: $color-grad-alert;
      }
    }
  }
  .btn-notification {
    border: 2px solid white;
    box-shadow: none;
    color: white;
    font-family: $font-primary;
    font-size: $font-size-l;
    border-radius: $b-radius-6;
    background: transparent;
    padding: 5px 15px;
    &:hover {
      background: white;
      color: $color-drakgrey;
    }
    &:focus {
      background: transparent;
      color: white;
    }
  }
}
.fade-enter-active {
  animation: toast-fade-in 0.5s ease-in-out;
}
.fade-leave-active {
  animation: toast-fade-in 0.5s ease-in-out reverse;
}

@keyframes toast-fade-in {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
