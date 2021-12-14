<template>
  <div class='party-alliance-wrap'>
    <div class="center-align between-row">
      <div v-for="(item, index) in headData"
           :key="index">
        <sl-item-data :options="{...item, number: partyData[item.prop] || 0}"></sl-item-data>
      </div>
    </div>

    <div v-show="workData.length > 0"
         class="work pt20 center-align between-row">
      <div class="relative"
           style="width: 515px; height: 265px">
        <div ref="workView"
             class="work-chart relative"
             style="width: 515px; height: 265px"></div>
        <div class="chart-title ft30 bold">重点工作完成情况</div>
        <img class="chart-bg"
             src="@/assets/main/work-pie-bg.png">
      </div>
      <div>
        <div v-for="(item, index) in workData"
             :key="index"
             class="center-align pt12 pb12 between-row">
          <div class="center-align">
            <div class="piece"
                 :style="{background: item.color}"></div>
            <span class="ft32 color-e0e0e2 ml16">{{item.name}}</span>
          </div>
          <div class="color-fff ml36 bold">
            <span style="font-size: 48px">{{item.number}}</span>
            <span class="ft28 ml8">项</span>
          </div>
        </div>
      </div>
    </div>

    <div class="ft34 mt28">
      <div class="between-row relative">
        <div class="bold">联盟活跃度TOP3</div>
        <div style="color:#ffffff80">热度</div>
        <span @click="onDialog"
              class="more-img">
          <img src="@/assets/main/more.png"
               mode="scaleToFill" />
        </span>
      </div>
      <div class="sort-list mt24">
        <sl-sort-item :options="item"
                      v-for="item in sortList"
                      :key="item.title"></sl-sort-item>
      </div>
    </div>
    <activity-data ref="activityData" />
  </div>
</template>
<script>
import SlItemData from '@/components/SlItemData.vue'
import ActivityData from './dialog/ActivityData.vue'
export default {
  components: { SlItemData, ActivityData },
  name: 'partyAlliance',
  methods: {
    onDialog () {
      console.log(66666)
      this.$refs.activityData.show()
    },
    initWorkView () {
      const workView = this.$echarts.init(this.$refs.workView)
      workView.setOption({
        series: [{
          type: 'pie',
          radius: ['55%', '75%'],
          hoverAnimation: false,
          top: 2,
          left: -3,
          label: {
            formatter: '{value|{c}%}\n{name|{b}}',
            rich: {
              value: {
                fontSize: 34,
                fontWeight: 'bold',
                color: '#ed452d'
              },
              name: {
                fontSize: 24,
                color: '#fefefd',
                opacity: 0.6
              }
            }
          },
          labelLine: {
            showAbove: true,
            length: 0,
            length2: 45,
            lineStyle: {
              color: '#f93f00',
              width: 2
            }
          },
          itemStyle: {
            color: (params) => params.data.color
          },
          data: this.workData
        }]
      })
      workView.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      })
    },
    setWorkData (data) {
      if (!data) return
      const { finishWorkNumber, finishWorkNumberRate, notStartWorkNumber, notStartWorkNumberRate, workingNumber, workingNumberRate } = data
      this.workData = [
        { value: Math.round(+finishWorkNumberRate), number: +finishWorkNumber, name: '已完成', color: '#54a30d', hoverAnimation: true },
        { value: Math.round(+notStartWorkNumberRate), number: +notStartWorkNumber, name: '未开始', color: '#808080' },
        { value: Math.round(+workingNumberRate), number: +workingNumber, name: '进行中', color: '#f73f02' }
      ]
    },
    setSortList (data) {
      if (!data) return
      const {
        firstActiveAllianceHeat, firstActiveAllianceName,
        secondActiveAllianceHeat, secondActiveAllianceName,
        thirdActiveAllianceHeat, thirdActiveAllianceName
      } = data
      this.sortList = [
        {
          serialNumber: '1',
          bgColor: '#d2452810',
          serialBgColor: '#ca3b2a',
          title: firstActiveAllianceName,
          number: firstActiveAllianceHeat
        },
        {
          serialNumber: '2',
          bgColor: 'transparent',
          serialBgColor: '#f8900f',
          title: secondActiveAllianceName,
          number: secondActiveAllianceHeat
        },
        {
          serialNumber: '3',
          bgColor: '#d2452810',
          serialBgColor: '#d7bc07',
          title: thirdActiveAllianceName,
          number: thirdActiveAllianceHeat
        }
      ]
    },
    getPartyUnion () {
      this.$api.getPartyUnion().then(res => {
        if (res.isError) return
        this.partyData = res.content || {}
        this.setWorkData(res.content)
        this.setSortList(res.content)
        this.initWorkView()
      })
    }
  },
  data () {
    return {
      partyData: {},
      headData: [
        {
          title: '联盟活动开展',
          prop: 'allianceActivityNumber',
          unit: '个'
        },
        {
          title: '联盟活动报名',
          prop: 'allianceActivitySignUpNumber',
          unit: '人'
        },
        {
          title: '论坛热度',
          prop: 'forumHeat'
        }
      ],
      workData: [],
      sortList: []
    }
  },
  mounted () {
    this.getPartyUnion()
  }
}
</script>
<style lang='scss' scoped>
.party-alliance-wrap {
  min-height: 690px;
  .work {
    .work-chart {
      z-index: 1;
    }
    .chart-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 122px;
      height: 64px;
    }
    .chart-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 267px;
      height: 267px;
    }
    .piece {
      width: 18px;
      height: 10px;
      border-radius: 4px;
    }
  }
  .ft52 {
    font-size: 52px;
  }
  .color-e0e0e2 {
    color: #e0e0e2;
  }
  .more-img {
    left: 276px !important;
    z-index: 20;
  }
}
</style>
