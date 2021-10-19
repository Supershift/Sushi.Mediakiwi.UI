<template>
<div
  v-if="notification.show"
  class="notification-container">
  <div
    class="notification-bubble"
    :class="alertCss">
      <fa 
        icon="sort-up"
        class="notification-top-icon" />
      <div class="notification-bubble-content">
          <fa :icon="iconChoice" />
          {{ notification.alertText }}
          <button 
            v-if="notification.hasAction"
            class="btn btn-notification">
            {{ notification.actionText }}
          </button>
      </div>
    </div>
</div>
</template>

<script>
import { computed, defineComponent } from "vue";
import store from "../../store/index";

export default defineComponent({
  name: "Notification",
  setup() {
    const notification = computed(() => store.getters.notification);
    const iconChoice = computed(() => {
      let icon = "";
      switch (notification.value.actionType) {
        case "success":
          icon = ["fal", "check-circle"];
          break;
        case "info":
          icon = ["fal", "exclamation-circle"];
          break;
        case "warning":
          icon = ["fal", "exclamation-triangle"];
          break;
        case "change":
          icon = ["fal", "exchange-alt"];
          break;
        case "alert":
          icon = ["fal", "hand-paper"];
          break;
        default:
          icon = ["fal", "check-circle"];
          break;
      }
      return icon;
    });
    const alertCss = computed(() => {
      let alertColor = "";
      switch (notification.value.actionType) {
        case "success":
          alertColor = "notification-success ";
          break;
        case "info":
          alertColor = "notification-info ";
          break;
        case "warning":
          alertColor = "notification-warning ";
          break;
        case "change":
          alertColor = "notification-change ";
          break;
        case "alert":
          alertColor = "notification-alert ";
          break;
        default:
          alertColor = "notification-success ";
          break;
      }
      return alertColor;
    });
    return {
      iconChoice,
      notification,
      alertCss,
    };
  },
});
</script>

<style scoped lang="scss">
.notification-container {
  position: absolute;
  right: 30px;
  top: 100px;
  .notification-bubble {
      position: relative;
      .notification-top-icon {
          position: absolute;
          right: 38px;
          top: -5px;
          color: $color-success;
          transform: scale(1.75);
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
    .notification-{
      &success {
          .notification-top-icon{
              color: $color-success;
          }
          .notification-bubble-content{
              background: $color-grad-success;
          }
      }
      &info {
          .notification-top-icon{
              color: $color-info;
          }
          .notification-bubble-content{
              background: $color-grad-info;
          }
      }
      &warning {
          .notification-top-icon {
              color: $color-warning;
          }
          .notification-bubble-content{
              background: $color-grad-warning;
          }
      }
      &alert {
          .notification-top-icon{
              color: $color-alert;
          }
          .notification-bubble-content{
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
</style>
