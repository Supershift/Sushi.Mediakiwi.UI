<template>
  <div class="profile-main-container">
    <div
      class="profile-container"
      @click="handleDialogToggle">
      <div
        class="profile-avatar-container"
        v-if="profileData">
        <div class="avatar">
          <img
            :src="profileData.userAvatarUrl"
            class="avatar-image"
            :alt="profileData.userName" />
          <fa
            icon="sort-down"
            class="profile-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {store} from "@/store";
import { UITypes } from "../../store/modules/UI";

export default defineComponent({
  name: "ProfileComponent",
  setup() {
    const breakpointTablet = 986;
    const profileData = computed(
      () => store.getters["Authentication/profileData"]
    );
    const brandData = computed(
      () => store.getters["Authentication/brandData"]
    );
    const brand = computed(
      () => store.getters["Authentication/brand"]
    );
    function handleDialogToggle() {
      // Only toggle if the window is small (mobile)
      if (window.innerWidth > breakpointTablet) {
        const dialog = store.getters["UI/isDialogOpen"];
        store.dispatch(UITypes.SET_DIALOG_OPEN, !dialog);
      }
    }
    return {
      profileData,
      brandData,
      brand,
      handleDialogToggle,
    };
  },
});
</script>

<style scoped lang="scss">
.profile-main-container {
  position: absolute;
  top: 0;
  right: 0;
}
.profile-brand {
  display: none;
  position: absolute;
  top: 15px;
  right: 150px;
  width: 112px;
  background-repeat: no-repeat;
  background-size: cover;
  img {
    height: 100%;
    widows: 100%;
    object-fit: cover;
  }
}
.profile-company-circle {
  display: none;
  position: absolute;
  top: 0;
  right: 100px;
  z-index: 25;
}
.profile-container {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 24;
  height: 75px;
  cursor: pointer;
  .profile-avatar-container {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 50px;
    width: 100%;
    .avatar {
      height: 48px;
      width: 48px;
      right: 20px;
      top: 15px;
      background: white;
      border-radius: 50%;
      position: absolute;
      border: 2px solid white;
      img {
        width: 100%;
        border-radius: 50%;
        height: 100%;
        object-fit: cover;
      }
    }
    .profile-icon {
      color: #2aa1e8;
      position: absolute;
      right: -18px;
      top: 15px;
    }
  }
}

@media (min-width: 480px) {
  .profile-container {
    background-image: url("../../assets/images/user-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 180px;
    .profile-avatar-container {
      margin-top: 15px;
      .avatar {
        right: 50px;
        top: unset;
      }
    }
  }

}
@media (min-width: 960px) {
  .profile-brand,
  .profile-company-circle  {
    display: block;
  }
}
</style>
