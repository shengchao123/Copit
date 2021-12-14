<template>
  <div class="flex sl-header-wrap">
    <div class="sl-header-left">党建统领、整体智治</div>
    <div class="sl-header-centent">
      <div class="header-title">“天目红盟”数字驾驶舱</div>
      <div class="header-text">产业振兴、人才振兴、文化振兴、生态振兴、组织振兴</div>
    </div>
    <div class="sl-header-right">
      <span>{{dateTime[0]}}</span>
      <span class="ml20">{{dateTime[2]}}</span>
      <span class="ml20">{{dateTime[1]}}</span>
      <span class="ml68">欢迎进入</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlHeader',
  methods: {
    getCurrentTime () {
      const temDate = new Date()
      const currentTime = temDate.getTime()
      const temTime = this.$moment(currentTime).format('YYYY-MM-DD HH:mm')
      this.dateTime = temTime.split(' ')
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const weekIndex = temDate.getDay()
      this.dateTime[2] = weeks[weekIndex]
    }
  },
  data () {
    return {
      timer: '', // 定义一个定时器的变量
      dateTime: []
    }
  },
  mounted () {
    this.getCurrentTime()
    this.timer = setInterval(() => {
      this.getCurrentTime()
    }, 6000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang='scss' scoped>
$header_text_color: #fdf5c1;
$header_title_color: #fcf050;
.ml20 {
  margin-left: 20px;
}
.ml68 {
  margin-left: 68px;
}
.sl-header-wrap {
  padding: 0 20px;
  height: 230px;
  .sl-header-left {
    font-weight: bold;
    font-size: 36px;
    line-height: 36px;
    font-style: italic;
    color: $header_text_color;
    margin-top: 62px;
  }
  .sl-header-centent {
    width: 1614px;
    margin: 24px 447px 0 702px;
    position: relative;
    .header-title {
      width: 1614px;
      height: 160px;
      font-size: 76px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      background-image: url("../../../assets/main/title-bg.png");
      font-weight: bold;
      letter-spacing: 5px;
      color: $header_title_color;
      text-align: center;
      padding-top: 24px;
    }
    .header-text {
      position: absolute;
      left: 362px;
      font-size: 36px;
      letter-spacing: 2px;
      color: $header_text_color;
      opacity: 0.7;
      text-align: center;
      padding-top: 42px;
    }
  }
  .sl-header-right {
    font-size: 32px;
    line-height: 32px;
    color: $header_text_color;
    margin-top: 60px;
  }
}
</style>
