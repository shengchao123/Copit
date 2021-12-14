<template>
  <div class='grassroots-governance-wrap'>
    <div class="between-row">
      <div v-for="(item,index) in topData"
           :key="index"
           class="top-item center-align">
        <div class="top-image-wrap center"
             :style="item.style">
          <img :src="item.img"
               :style="item.imgStyle"
               mode="scaleToFill" />
        </div>
        <sl-item-data :options="item.data"
                      class="column"></sl-item-data>
      </div>
    </div>
    <div class="between-row">
      <div v-for="item in infoData"
           :key="item.title">
        <sl-item-data :options="item"
                      class="column"></sl-item-data>
      </div>
      <div id="main12"
           class="rate-chart"
           style="width: 200px; height: 200px"></div>
      <!-- TODO:占比不对 -->
      <div class="rate-wrap relative"
           v-for="item in rateData"
           :key="item.title">
        <div id="closingRateRef"
             class="rate-chart"
             style="width: 200px; height: 200px"></div>
        <div class="rate-text">
          <div><span class="ft30 bold">{{item.number}}</span>%</div>
          <div class="mt8">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlItemData from '@/components/SlItemData'
export default {
  name: 'SlGrassrootsGovernance',
  methods: {
    // 基层治理数据
    getBasicGovernance () {
      this.$api.getBasicGovernance().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.handleData(res.content)
      })
    },
    // 处理数据
    handleData (dataList) {
      const _topDataKeys = ['grassrootsPartyOrganizationsNumber', 'goodsCaseNumber']
      const _infoDataKeys = ['consultativeOrdersNumber', 'competitiveOrdersNumber']
      const _rateDataKeys = ['closingRate', 'praiseRate']
      this.topData = this.topData.map((item, i) => {
        const _key = _topDataKeys[i]
        item.data.number = dataList[_key]
        return item
      })
      this.infoData = this.infoData.map((item, i) => {
        const _key = _infoDataKeys[i]
        item.number = dataList[_key]
        return item
      })
      this.rateData = this.rateData.map((item, i) => {
        const _key = _rateDataKeys[i]
        item.number = dataList[_key]
        return item
      })
      this.$nextTick(() => {
        this.initEChartsData('closingRateRef', '#d03d28', this.rateData[0].number)
        // this.initEChartsData('praiseRateRef', '#00e4ff', this.rateData[1].number)
      })
    },
    // 办结率、好评率
    initEChartsData (refData, color, numberData) {
      console.log(333, refData, color, numberData)
      const initEcharts = this.$echarts.init(document.getElementById('closingRateRef'))
      // const initEcharts = this.$echarts.init(this.$refs.closingRateRef)
      console.log(222, initEcharts)
      initEcharts.setOption({
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 100,
            itemStyle: {
              color: color,
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 16
            },
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 16,
                color: [
                  [1, '#646d78']
                ]
              }
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            title: {
              show: false
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 20
              }
            ]
          }
        ]
      })
    },
  },
  data () {
    return {
      topData: [
        {
          img: require('../../../assets/main/emblem.png'),
          imgStyle: {
            width: '51px',
            height: '51px'
          },
          style: { background: 'linear-gradient(0deg, #e43644 0%,#e95045 100%)' },
          data: {
            title: '基层党组织数',
            unit: '个',
            number: 0
          }
        },
        {
          img: require('../../../assets/main/case.png'),
          imgStyle: {
            width: '46px',
            height: '50px'
          },
          style: { background: 'linear-gradient(0deg, #e27603 0%,#f5951f 100%)' },
          data: {
            title: '好案例',
            unit: '个',
            number: 0
          }
        }
      ],
      infoData: [
        {
          title: '磋商性接单',
          unit: '单',
          number: 0
        },
        {
          title: '竞争性抢单',
          unit: '单',
          number: 0
        },
      ],
      rateData: [
        {
          title: '办结率',
          unit: '%',
          number: 0,
          ref: 'closingRateRef'
        },
        {
          title: '好评率',
          unit: '%',
          number: 0,
          ref: 'praiseRateRef'
        }
      ]
    }
  },
  created () {
    this.getBasicGovernance()
    this.$nextTick(() => {


      var chartDom = document.getElementById('main12');
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
              // overlap: true,
              // clip: true
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 16,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18,
                color: [
                  [1, '#646d78']
                ]
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 20
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              borderColor: '#999',
              borderWidth: 2,
              width: '60%',
              lineHeight: 40,
              height: 40,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}{unit|km/h}';
              },
              rich: {
                value: {
                  fontSize: 50,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 20,
                  color: '#999',
                  padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                value: 70
              }
            ]
          }
        ]
      };

      option && myChart.setOption(option);
    })
  },
  components: {
    SlItemData
  }
}
</script>

<style lang='scss' scoped>
.grassroots-governance-wrap {
  .top-item {
    width: 410px;
    height: 132px;
    background-color: #d2452810;
    border-radius: 4px;
    margin-bottom: 30px;
    .top-image-wrap {
      width: 82px;
      height: 82px;
      margin: 0 40px;
      border-radius: 4px;
    }
  }
}
.rate-wrap {
  position: relative;
  width: 200px;
  height: 100px;
  .rate-chart {
    position: absolute;
    top: -20px;
  }
  .rate-text {
    text-align: center;
    margin-top: 44px;
    font-size: 24px;
  }
}
</style>
