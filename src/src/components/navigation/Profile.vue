<template>
<div class="profile-main-container">
  <div class="profile-brand">
    <img :src="brandData.logo"
    class="brand-image"
    :alt="brandData.title">
  </div>
  <img src="../../assets/images/company-circle.png" class="profile-company-circle">
  <div class="profile-container"  @click="handleDialogToggle()">
      <div class="profile-avatar-container">
          <div class="avatar">
            <img :src="profileData.avatar" class="avatar-image" :alt="profileData.name">
            <fa icon="sort-down" class="profile-icon"></fa>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import { computed, defineComponent } from "vue";
import store from "../../store/index";

export default defineComponent({
  name: "Profile",
  setup() {
    const profileData = computed(() => store.getters.profileData);
    const brandData = computed(() => store.getters.brandData);
    function handleDialogToggle() {
      store.dispatch("toggleDialog");
    }
    return {
      profileData,
      brandData,
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
    background-image: url('../../assets/images/user-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 180px;
    height: 75px;
    cursor: pointer;
    .profile-avatar-container{
        position: relative;
        display: flex;
        flex-direction: row;
        height: 50px;
        width: 100%;
        margin-top: 15px;
        .avatar {
            height: 48px;
            width: 48px;
            right: 54px;
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
</style>
