<template>
  <div class='block-wrap'
       :style="{width, height}">

    <div class="title-wrap center-align mb32"
         :class="options.isContentStyle === false && 'ml38'"
         v-if="options.title">
      <div class="parallelogram mr8 linear1"></div>
      <div class="parallelogram linear2"></div>
      <div class="bold title ml48">{{options.title}}</div>
    </div>
    <div :class="options.isContentStyle === false ?'': 'content-bg'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Block',
  data () {
    return {

    }
  },
  props: {
    options: Object,
    default: () => {
      return {
        title: '',
        isContentStyle: true,
      }
    }
  },
  computed: {
    width () {
      return this.options.width + 'px'
    },
    height () {
      return this.options.height + 'px'
    }
  }
}
</script>

<style lang='scss' scoped>
$deg: -20deg;

.ml38 {
  margin-left: 38px;
}

.block-wrap {
  padding: 32px;
  background-image: url("~@/assets/main/border.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  .title-wrap {
    .title {
      font-size: 42px;
      color: #fcf050;
    }
    .parallelogram {
      width: 32px;
      height: 40px;
      transform: skew($deg);
      -webkit-transform: skew($deg);
      -moz-transform: skew($deg);
      -o-transform: skew($deg);
      -ms-transform: skew($deg);
      background-color: red;
    }
    .linear1 {
      background-image: linear-gradient(90deg, #c33930 0%, #d4473a 100%);
    }
    .linear2 {
      background-image: linear-gradient(90deg, #dc4f40 0%, #ec5d4a 100%);
    }
  }

  .content-bg {
    padding: 32px;
    background-color: rgba($color: #ffffff, $alpha: 0.06);
    border-radius: 8px;
  }
}
</style>
