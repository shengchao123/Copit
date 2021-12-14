<template>
  <div class='block-wrap'
       :style="{width, height}"
       v-if="dialogShow">
    <div class="title-wrap center-align mb52"
         v-if="options.title">
      <div class="parallelogram mr8 linear1"></div>
      <div class="parallelogram linear2"></div>
      <div class="bold title ml48">{{options.title}}</div>
    </div>
    <div class="close-wrap"
         @click="onClose">
      <img src="@/assets/main/close.png"
           class="close-img"
           mode="scaleToFill" />
    </div>
    <div :class="options.isNeedBg && 'content-bg'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlDialog',
  methods: {
    onClose () {
      this.$emit('update:dialogShow', false)
    }
  },
  data () {
    return {

    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: '',
          isNeedBg: false,
        }
      }
    },
    dialogShow: {
      type: Boolean,
      default: false,
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
.mb52 {
  margin-bottom: 52px;
}

.block-wrap {
  position: fixed;
  z-index: 100;
  padding: 88px 72px 110px;
  top: 300px;
  left: 50%;
  transform: translate(-50%, 0%);
  background-image: url("~@/assets/main/dialog-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  .title-wrap {
    .title {
      font-size: 64px;
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
  .close-wrap {
    position: absolute;
    right: 72px;
    top: 98px;
    cursor: pointer;
    .close-img {
      width: 54px;
      height: 52px;
    }
  }

  .content-bg {
    background-color: #29295760;
    border-radius: 16px;
  }
}
</style>
