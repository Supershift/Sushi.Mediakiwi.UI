<template>
  <div
    v-if="dialog.show"
    class="dialog-container">
    <div class="dialog-bubble">
      <fa
        icon="sort-up"
        class="dialog-top-icon" />
      <div class="dialog-bubble-content">
        <div class="dialog-header">
          <h2>My Profile</h2>
        </div>
        <div class="dialog-main">
          <div
            class="profile-avatar-container"
            v-if="profileData">
            <div class="avatar">
              <img
                v-if="profileData.avatarPath"
                :src="profileData.avatarPath"
                class="avatar-image"
                :alt="profileData.name" />
            </div>
            <div class="avatar-info">
              {{ profileData.fullName }}
              <sub> {{ profileData.email }} </sub>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <a v-if="dialog.settings" href>
            Profile Settings
          </a>
          <button
            class="btn btn-dialog-footer"
            @click="handleSignOut">
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, computed} from "vue";
import {store} from "@/store";
export default defineComponent({
  name: "Dailog",
  setup() {
    const profileData = computed(
      () => store.getters.profileData
    );
    const dialog = computed(
      () => store.getters.dialog
    );
    function handleSignOut() {
      //   console.log("TODO: Logout!");
    }
    return {
      profileData,
      dialog,
      handleSignOut,
    };
  },
});
</script>

<style scoped lang="scss">
.dialog-container {
  position: absolute;
  right: 30px;
  top: 100px;
  z-index: 999;
  .dialog-bubble {
    position: relative;
    .dialog-top-icon {
      position: absolute;
      right: 30px;
      top: -5px;
      color: $color-success;
      transform: scale(1.75);
    }
  }
  .dialog-bubble-content {
    font-family: $font-primary;
    font-size: $font-size-l;
    .dialog- {
      &header {
        padding: 15px 30px;
        background: $color-grad-success;
        border-radius: $b-radius-6 $b-radius-6 0 0;
        border-bottom: 1px solid
          $color-really-lightblue;
        h2 {
          margin: 0;
          color: white;
          font-family: $font-primary;
          font-size: $font-size-xl;
          font-weight: $font-weight-regular;
        }
      }
      &main {
        padding: 15px 100px;
        background: $color-success;
        .profile-avatar-container {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .avatar {
            height: 96px;
            width: 96px;
            background: white;
            border-radius: 50%;
            margin-bottom: 15px;
            img {
              width: 100%;
              border-radius: 50%;
              height: 100%;
              object-fit: cover;
              border: 4px solid white;
            }
          }
          .avatar-info {
            display: flex;
            flex-direction: column;
            text-align: center;
            color: white;
          }
        }
      }
      &footer {
        padding: 15px 30px;
        padding-bottom: 20px;
        background: $color-grad-success;
        border-radius: 0 0 $b-radius-6 $b-radius-6;
        justify-content: flex-end;
        display: flex;
        flex-direction: row;
        a {
          color: $color-lightblue;
        }
      }
    }
  }
}
</style>
