<template>
    <div class="overlay-loader" v-if="loading">
      <div class="lds-container"> 
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { store } from "../store";

export default defineComponent({
    name: "OverlayLoader",
    setup() {
        const loading = computed(() => store.getters["UI/mediakiwiLoading"]);
        return {
            loading,
        };
    }
});
</script>

<style lang="scss">
.overlay-loader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}
.lds-container {
  position: relative;
  top: 50%;
  left: 50%;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>