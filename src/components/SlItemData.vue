<template>
  <div class='sl-item-data-wrap'>
    <div class="title"
         v-if="options.title">{{options.title}}</div>
    <div class="mt24 wrap text-hidden">
      <span class="data fl"
            v-if="!$isEmpty(options.number)">{{options.number}}</span>
      <span class="unit fl"
            v-if="options.unit">{{options.unit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlItemData',
  props: {
    options: Object
  }
}
</script>

<style lang='scss' scoped>
.sl-item-data-wrap {
  .title {
    font-size: 32px;
    color: #e0e0e2;
  }
  .wrap {
    overflow: hidden;
  }
  .data {
    font-weight: bold;
    font-size: 52px;
    line-height: 40px;
    color: #ffffff;
  }
  .unit {
    margin-top: 4px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
