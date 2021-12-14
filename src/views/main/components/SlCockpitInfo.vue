<template>
  <div class='cockpit-info-wrap'>
    <div class="cockpit-orbital">
      <div class="cockpit-title">天目红盟 共同富裕</div>
      <img :src="img.title"
           class="cockpit-title-img"
           mode="scaleToFill" />
      <div v-for="item in moduleProp"
           :key="item.id"
           :style="item.positionStyle"
           class="module-wrap center">
        <img :src="img.outsideRound"
             class="outside-round-img"
             mode="scaleToFill" />
        <img :src="img.inRound"
             class="in-round-img"
             mode="scaleToFill" />
        <div class="within-round-wrap column center"
             :style="'backgroundImage:url(' + require('../../../assets/cockpit/within-'+item.id+'.png') + ')'">
          <img :src="require(`../../../assets/cockpit/module-logo${item.id}.png`)"
               :style="item.imgStyle"
               mode="scaleToFill" />
          <div class="mt4 module-name">{{item.name}}</div>
        </div>

      </div>
    </div>

    <div class="between-row pl28 pr28">
      <div v-for="item in infoProp"
           :key="item.title">
        <sl-item-data :options="item"
                      class="column center-align"></sl-item-data>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlCockpitInfo',
  data () {
    return {
      img: Object.freeze({
        title: require('../../../assets/cockpit/title-bg.png'),
        outsideRound: require('../../../assets/cockpit/outside-round.png'),
        inRound: require('../../../assets/cockpit/in-round.png')
      }),
      moduleProp: Object([
        {
          id: 1,
          name: '初心之旅一张图',
          imgStyle: {
            width: '48px',
            height: '53px'
          },
          positionStyle: {
            left: '20px',
            top: '-50px'
          }
        },
        {
          id: 2,
          name: '组团发展一联盟',
          imgStyle: {
            width: '47px',
            height: '50px'
          },
          positionStyle: {
            left: '234px',
            top: '76px'
          }
        },
        {
          id: 3,
          name: '城乡融合一社区',
          imgStyle: {
            width: '54px',
            height: '44px'
          },
          positionStyle: {
            left: '518px',
            top: '88px'
          }
        },
        {
          id: 4,
          name: '乡村人才一智库',
          imgStyle: {
            width: '55px',
            height: '43px'
          },
          positionStyle: {
            right: '296px',
            top: '70px'
          }
        },
        {
          id: 5,
          name: '基层治理一管家',
          imgStyle: {
            width: '51px',
            height: '52px'
          },
          positionStyle: {
            right: '20px',
            top: '-58px'
          }
        }

      ]),
      infoProp: Object.freeze([
        {
          title: '党建联盟',
          unit: '个',
          number: 19
        },
        {
          title: '共同富裕示范带',
          unit: '条',
          number: 19
        },
        {
          title: '初心驿站',
          unit: '个',
          number: 23
        },
        {
          title: '红色资源点',
          unit: '个',
          number: 86
        },
        {
          title: '共享组织生活馆',
          unit: '个',
          number: 100
        },
        {
          title: '党群服务中心',
          unit: '个',
          number: 326
        }
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
.cockpit-info-wrap {
  .cockpit-orbital {
    position: relative;
    margin: 85px auto 140px;
    width: 1312px;
    height: 210px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-image: url("../../../assets/cockpit/orbital.png");
  }
  .cockpit-title {
    position: absolute;
    left: 442px;
    top: -24px;
    font-size: 48px;
    font-weight: bold;
    line-height: 40px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .cockpit-title-img {
    width: 290px;
    height: 36px;
    position: absolute;
    left: 500px;
    top: 12px;
  }
  .module-wrap {
    position: absolute;
    width: 198px;
    height: 198px;
  }
  .outside-round-img {
    position: absolute;
    width: 198px;
    height: 198px;
    animation: rotate-out 8s linear infinite;
  }
  .in-round-img {
    width: 178px;
    height: 178px;
    position: absolute;
    animation: rotate-in 8s linear infinite;
  }
  .cockpit-orbital .module-wrap:nth-of-type(2n) {
    .outside-round-img {
      animation: rotate-in 8s linear infinite;
    }
    .in-round-img {
      animation: rotate-out 8s linear infinite;
    }
  }
  .within-round-wrap {
    position: absolute;
    width: 216px;
    height: 216px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .module-name {
    width: 96px;
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: center;
    color: #ffffff;
  }
  @keyframes rotate-out {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate-out {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-ms-keyframes rotate-out {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes rotate-out {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes rotate-in {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  @-moz-keyframes rotate-in {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  @-ms-keyframes rotate-in {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  @-webkit-keyframes rotate-in {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
}
</style>
