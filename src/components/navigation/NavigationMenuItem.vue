<template>
  <li :id="elementID" class="navigation-link">
    <a :href="item.href">{{ item.text }}</a>

    <div class="sub" v-if="item.items">
      <ul>
        <li
          v-for="subItem in item.items"
          :key="subItem.id">
          <a :href="subItem.href">{{
            subItem.text
          }}</a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from "@vue/runtime-core";
import TopNavigationItemModel from "@/models/Mediakiwi/TopNavigationItemModel";

export default defineComponent({
  name: "NavigationMenuItem",
  props: {
    item: {
      type: Object as PropType<TopNavigationItemModel>,
      required: true,
    },
  },
  setup(props) {
    const elementID = computed(
      () => `${props.item.id}_${props.item.text}`
    );
    return {
      elementID,
    };
  },
});
</script>

<style scoped lang="scss">
.navigation-link {
  padding: 15px 0;
  background: white;
  cursor: pointer;
  float: left;
  position: relative;
  text-align: center;
  width: 100%;

  .sub {
    display: none;
    padding: 0;
    border-radius: 2px;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    float: left;
    box-sizing: border-box;
    z-index: 19999999;
    width: auto;
    box-shadow: 0 1px 3px 0 #a3a3a3;
    border-radius: 4px;
    background: #fff;

    ul {
      li {
        display: block;
        width: inherit;
        border-bottom: solid 1px #e3e5e6 !important;
        padding: 15px;
        a {
          white-space: nowrap;
        }
      }
    }
  }

  &:hover {
    border-bottom: 4px solid #2aa1e8;
    > a {
      color: $color-blue;

      + .sub {
        display: block;
      }
    }
  }

  &:focus-within {
    border-style: outset;
    border: 2px solid $color-main;
  }

  a {
    outline: none;
    text-decoration: none;
    color: $color-drakgrey;
    &:hover {
      color: $color-blue;
    }
  }
}
@media (min-width: 786px) {
  .navigation-link {
    padding: 15px;
    width: unset;
  }
}
</style>
