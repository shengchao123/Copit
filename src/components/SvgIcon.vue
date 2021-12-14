<template>
  <svg class="svg-icon"
       :style="{fontSize: fontSize + 'px', color: color}"
       aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    fontSize: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#${this.iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
