<template>
  <div class="profile-main-container">
    <div class="profile-brand">
      <img
        :src="brand?.logoUrl"
        class="brand-image"
        alt="Brand image"
      />
    </div>
    <img
      src="../../assets/images/company-circle.png"
      class="profile-company-circle" />
    <div
      class="profile-container"
      @click="handleDialogToggle">
      <div
        class="profile-avatar-container"
        v-if="profileData">
        <div class="avatar">
          <img
            :src="profileData.avatarPath"
            class="avatar-image"
            :alt="profileData.name" />
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

export default defineComponent({
  name: "Profile",
  setup() {
    const breakpointTablet = 986;
    const profileData = computed(
      () => store.getters.profileData
    );
    const brandData = computed(
      () => store.getters.brandData
    );
    const brand = computed(
      () => store.getters.profileData.company
    );
    function handleDialogToggle() {
      // Only toggle if the window is small (mobile)
      if (window.innerWidth > breakpointTablet) {
        store.commit("toggleDialog");
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
      img {
        width: 100%;
        border-radius: 50%;
        height: 100%;
        object-fit: cover;
        border: 2px solid white;
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
        right: 54px;
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
