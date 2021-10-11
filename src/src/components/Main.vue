<template>
    <div class="content-container row">
        <div class="col main-container">
            CONTENT
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'main-view',
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.content-container {
  margin: auto;
  height: auto;
  .main-container {
      margin: auto;
  }
}
</style>
