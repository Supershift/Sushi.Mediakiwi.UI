<template>
  <li
    :id="id+'_'+name"
    class="navigation-link"
  >
    <a href="/">
      {{ name }}
    </a>
  </li>
</template>

<script>
export default {
  name: "NavigationMenuItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.navigation-link {
    padding: 15px;
    background: white;
    cursor: pointer;
    &:hover {
        border-bottom: 4px solid #2aa1e8;
        a {
            color: $color-blue;
        }
    }
    &:focus-within {
      border-style: outset;
      border: 2px solid $color-main;
    }
    a {
        text-decoration: none;
        color: $color-drakgrey;
        &:hover {
            color: $color-blue;
            //font-weight: bold;
        }
    }
}
</style>
