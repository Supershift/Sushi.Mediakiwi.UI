<template>
  <div class="folder">
    <h2>
      <a :href="folder.href">{{
        folder.title
      }}</a>
    </h2>
    <a
      v-for="item in folder.items"
      :key="item.id"
      :href="item.href"
      :class="classes">
      {{ item.title }}</a
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
  name: "FolderComponent",
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
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  // transition-property: left, right, top;
  // transition-duration: 0.6s;
  overflow: hidden;
  flex: 1 0 30%;
  margin-right: 15px;

  h2 {
    font-size: $font-size-xxl;
    margin: 0 auto;
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
    margin: 0 auto;
    padding: 10px 8px;
    border-top: solid 1px #fff;
    font-size: $font-size-base;
    font-family: $font-primary;
    text-decoration: none;

    &:first-of-type {
      border-top: none;
      margin-top: -10px;
    }
  }
}
@media (min-width: $grid-m) {
  .folder{
    h2 {
      font-size: $font-size-xxl;
    }
  }
}
</style>
