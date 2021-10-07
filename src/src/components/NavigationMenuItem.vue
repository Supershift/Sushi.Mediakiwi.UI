<template>
  <li :id="id+'_'+name" class="navigation-link"><a href="/">{{ name }}</a></li>
</template>

<script>
export default {
  name: 'Navigation Menu Item',
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
    margin: 0 15px;
    padding: 15px 0;
    background: white;
    cursor: pointer;
    &:first-of-type {
        margin-left: 0;
    }
    &:last-of-type {
        margin-right: 0;
    }
    &:hover {
        border-bottom: 4px solid #2aa1e8;
        a {
            color: $color-blue;
        }
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
