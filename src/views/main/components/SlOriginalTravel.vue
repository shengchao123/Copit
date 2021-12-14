<template>
  <div class='original-travel-wrap'>
    <div class="top end-align relative">
      <sl-item-data :options="itemDataOptions1"></sl-item-data>
      <span @click="onDialog('touristData')"
            class="more-img more-today">
        <img src="@/assets/main/more.png"
             mode="scaleToFill" />
      </span>
      <div class="tip ft26 ml20"
           v-if="pageData.rate">较昨日
        <span :style="{color:pageData.rate > 0 ? '#509831' : '#ca3b2a'}"
              class="bold">{{pageData.rate}}%
        </span>
      </div>
      <sl-item-data :options="itemDataOptions2"
                    class="right"></sl-item-data>
    </div>

    <div class="list between-row mt40">
      <div class="item center"
           v-for="item in dataList"
           :key="item.title">
        <sl-item-data :options="item"
                      class="right column center-align"></sl-item-data>
      </div>
    </div>

    <div class="footer ft34 mt40">
      <div class="between-row relative">
        <div class="bold">最受欢迎线路 TOP3</div>
        <div style="color:#ffffff80"
             class="mr16">热度</div>
        <span @click="onDialog('lineData')"
              class="more-img more-line">
          <img src="@/assets/main/more.png"
               mode="scaleToFill" />
        </span>
      </div>

      <div class="sort-list mt24">
        <sl-sort-item :options="item"
                      v-for="(item, index) in sortList"
                      :key="index"></sl-sort-item>
      </div>
    </div>
    <line-data ref="lineData" />
    <tourist-data ref="touristData" />

  </div>
</template>

<script>

import SlItemData from '@/components/SlItemData'
import SlSortItem from '@/components/SlSortItem'
import LineData from './dialog/LineData'
import TouristData from './dialog/TouristData'
export default {
  name: 'SlOriginalTravel',
  methods: {
    onDialog (refType) {
      this.$refs[refType].show()
    },
    getMindJourney () {
      this.$api.getMindJourney().then(res => {
        if (res.isError) return
        this.handleData(res)
        this.pageData = res.content || {}
      })
    },
    handleData (res) {
      if (!res || !res.content) return
      const { todayVisitorsNumber, totalVisitorsNumber, firstPopularLineHeat, firstPopularLineName, secondPopularLineName, secondPopularLineHeat, thirdPopularLineName, thirdPopularLineHeat } = res.content
      this.itemDataOptions1.number = todayVisitorsNumber || 0
      this.itemDataOptions2.number = totalVisitorsNumber || 0

      const _dataMap = new Map([
        [0, 'accumulativeItinerary'],
        [1, 'accumulativeSignIn'],
        [2, 'evaluationHeat']
      ])
      this.dataList = this.dataList.map((item, i) => {
        const _key = _dataMap.get(i)
        item.number = res.content[_key]
        if (Number(item.number) > 9999 && item.title === '累计打卡') {
          item.number = Number(item.number / 10000).toFixed(2)
          item.unit = '万人'
        }
        return item
      })

      const _sortMap = new Map([
        [0, { title: firstPopularLineName, number: firstPopularLineHeat }],
        [1, { title: secondPopularLineName, number: secondPopularLineHeat }],
        [2, { title: thirdPopularLineName, number: thirdPopularLineHeat }]
      ])

      this.sortList = this.sortList.map((item, i) => {
        const _item = _sortMap.get(i)
        item = {
          ...item,
          ..._item
        }
        return item
      })
    }
  },
  components: { SlItemData, SlSortItem, LineData, TouristData },
  data () {
    return {
      pageData: {},
      itemDataOptions1: {
        title: '今日游客',
        number: 10000,
        unit: '人'
      },
      itemDataOptions2: {
        title: '游客总数',
        number: 0,
        unit: '人次'
      },

      dataList: [
        {
          title: '累计行程',
          number: 0,
          unit: '个'
        }, {
          title: '累计打卡',
          number: 0,
          unit: '人'
        },
        {
          title: '评价热度',
          number: 0
        }
      ],

      sortList: [
        {
          serialNumber: '1',
          bgColor: '#d2452810',
          serialBgColor: '#ca3b2a',
          title: '',
          number: 0
        },
        {
          serialNumber: '2',
          bgColor: 'transparent',
          serialBgColor: '#f8900f',
          title: '',
          number: 0
        },
        {
          serialNumber: '3',
          bgColor: '#d2452810',
          serialBgColor: '#d7bc07',
          title: '',
          number: 0
        }
      ]
    }
  },
  created () {
    this.getMindJourney()
  }
}
</script>

<style lang='scss' scoped>
.original-travel-wrap {
  .top {
    position: relative;
    .tip {
      margin-right: 100px;
    }
    .right {
      position: absolute;
      left: 550px;
    }
  }
  .list {
    .item {
      flex: 0.3;
      padding: 40px 0;
      border: dashed 2px #ffffff80;
    }
  }
  .more-line {
    left: 324px !important;
  }
  .more-today {
    left: 148px !important;
  }
}
</style>
