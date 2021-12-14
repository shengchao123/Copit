<template>
  <div class='sort-item-wrap center-align ft34'
       :style="{backgroundColor: options.bgColor}">
    <div class="serial-number center ft32 bold"
         :style="serialStyle">{{options.serialNumber}}</div>
    <div class="title ml56 flex1 text-hidden ellipsis mr24">{{options.title}}</div>
    <div class="data bold">{{options.number}}</div>
  </div>
</template>

<script>
export default {
  name: 'SlSortItem',
  props: {
    options: Object,
    default: () => {
      return {
        serialNumber: '',
        bgColor: '',
        serialBgColor: '',
        title: '',
        number: ''
      }
    }
  },
  computed: {
    serialStyle () {
      return `background: linear-gradient(225deg, transparent 8px, ${this.options.serialBgColor} 0);color: #01191f;`
    }
  }
}
</script>

<style lang='scss' scoped>
.sort-item-wrap {
  padding: 12px 16px 12px 5px;
  .serial-number {
    width: 48px;
    height: 48px;
  }
}
</style>
