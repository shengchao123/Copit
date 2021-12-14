<template>
  <sl-dialog :options="options"
             :dialogShow.sync="dialogShow">
    <div id="touristData"
         style="width: 100%; height:1120px"></div>
  </sl-dialog>

</template>

<script>
import SlDialog from '@/components/SlDialog.vue'
export default {
  name: 'TouristData',
  components: { SlDialog },
  methods: {
    show () {
      this.getAllianceStatisticsList()
      this.dialogShow = true
    },
    getAllianceStatisticsList () {
      this.$api.getAllianceStatisticsList().then(res => {
        if (res.isError) return
        this.tableData = res?.content ?? []
        this.$nextTick(() => {
          this.initEChartsData()
        })

      })
    },
    // 表格
    initEChartsData () {
      const initEcharts = this.$echarts.init(document.getElementById('touristData'))
      initEcharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            var $pna = params.name;
            var res = '';

            for (var i = 0; i < $imgs.length; i++) {
              if ($imgs[i].area == $pna) {
                res = `<img src="'+ $imgs[i].url +'" />`;//设置自定义数据的模板，这里的模板是图片
                //console.log(res);
                break;
              }
            }

            setTimeout(function () {
              // 仅为了模拟异步回调
              callback(ticket, res);//回调函数，这里可以做异步请求加载的一些代码
            }, 1000)
            return 'loading';
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: { //改变轴线颜色
            lineStyle: {
              color: '#3c68a4',
              width: 7
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#cccccc',  //更改坐标轴文字颜色
              fontSize: 52      //更改坐标轴文字大小
            },
            margin: 58,
          },
          axisTick: { //去除刻度线
            show: false,
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 7, //y轴显示数量
          //   interval: 1,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#cccccc',  //更改坐标轴文字颜色
              fontSize: 52      //更改坐标轴文字大小
            },
            margin: 52,
          },
          axisLine: { //去除轴线
            show: false
          },
          axisTick: { //去除刻度线
            show: false,
          },
          splitLine: { // y轴分割线
            show: true,
            lineStyle: {
              color: '#fff',
              width: 3,
              opacity: 0.15
            },
            interval: 0
          },
        },
        color: ['#4df8fe'],
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            areaStyle: {
              //   color: 'linear-gradient(180deg,#4df8fe 0%, #4df8fe 100%)',
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(77, 248, 254,0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(77, 248, 254,0.0)'
                }
              ])
            },
            lineStyle: {
              width: 4
            }
          }
        ]
      })
    },
  },
  data () {
    return {
      options: {
        title: '今日游客',
        width: 2830,
        height: 1420
      },
      dialogShow: false,
      dialogHead: [
        {
          name: '排名',
          width: '340',
        },
        {
          name: '党建联盟',
          width: '755'
        },
        {
          name: '热度',
          width: '200'
        }
      ],
      tableData: []
    }
  },
  computed: {
    serialStyle () {
      return (val) => {
        const colorMap = new Map([
          [1, '#ca3b2a'],
          [2, '#f8900f'],
          [3, '#d7bc07'],
        ])
        const temColor = colorMap.get(val)
        const temStyle = `background: linear-gradient(225deg, transparent 8px, ${temColor} 0);color: #01191f`
        return val < 4 ? temStyle : ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.ft42 {
  font-size: 42px;
}
.list-wrap {
  display: flex;
  height: 120px;
  background-color: #26204c;
  border-radius: 16px 16px 0px 0px;
  align-items: center;
  padding-left: 60px;
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
}
.list-item {
  padding: 0 20px;
}

.table-wrap {
  max-height: 1170px;
  overflow: auto;
  .sort-item-wrap {
    height: 120px;
    line-height: 120px;
    padding-left: 60px;
    font-size: 36px;
    color: #fff;
    &:nth-of-type(2n) {
      background-color: #362f60 !important;
    }
  }
  .serial-number {
    width: 48px;
    height: 48px;
  }
}
</style>