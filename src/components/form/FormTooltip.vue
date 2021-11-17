<template>
  <div class="tooltip-content">
    <slot/>
    <div class="tooltip">
      <span v-if="tooltip" class="tooltiptext">{{ tooltip }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "FormTooltip",
    props: {
      tooltip: {
        type: String,
        required: false,
      }
    },
})
</script>

<style lang="scss">
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  display: none;
  animation: fade-in 3s;
  min-width: 150px;
  background-color: $color-drakgrey;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-family: $font-primary;
  font-size: $font-size-xs;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -20px;
}
.tooltip .tooltiptext:after {
   content: "";
   position: absolute;
   top: -5px;
   left: 50%;
   color: $color-drakgrey;
   border-bottom: 5px solid $color-drakgrey;
   border-top-color: inherit; 
   border-left: 5px solid transparent;
   border-right: 5px solid transparent; 
}

.tooltip-content:hover .tooltiptext {
  display: block;
}
@keyframes fade-in {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>