<template>
  <div class="folder">
    <h2>
      <a :href="folder.href">{{
        folder.folderName
      }}</a>
    </h2>
    <a
      v-for="item in folder.items"
      :key="item.id"
      :href="item.href"
      :class="classes">
      {{ item.text }}</a
    >
  </div>
</template>

<script lang="ts">
import FolderItemModel from "@/models/Mediakiwi/FolderItemModel";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";

export default defineComponent({
  props: {
    folder: {
      type: Object as PropType<FolderItemModel>,
      required: true,
    },
  },
  setup(props) {
    const classes = computed(() => {
      return {
        unpublished: !props.folder.isPublished,
        edited: props.folder.isEdited,
      };
    });
    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
.folder {
  height: auto;
  margin-bottom: 10px;
  background: #f6f6f7;
  padding: 20px 0 0;
  display: inline-block;
  transition-property: left, right, top;
  transition-duration: 0.6s;
  overflow: hidden;
  width: 100%;

  h2 {
    width: 100%;
    font-size: 200%;
    margin-top: 0;
    font-family: $font-primary;

    a {
      color: #0fabd4 !important;
      line-height: 30px;
      margin-top: 0;
      padding-top: 0;
      text-decoration: none;
    }
  }

  a {
    border-color: #fff !important;
    color: #2f353b;
    display: inline-block;
    margin: 0;
    padding: 10px 20px;
    width: 100%;
    border-top: solid 1px #fff;
    font-size: 110%;
    font-family: $font-primary;
    text-decoration: none;

    &:first-of-type {
      border-top: none;
      margin-top: -20px;
    }
  }
}
</style>
