<template>
  <sl-dialog :options="options"
             :dialogShow.sync="dialogShow">
    <div class="list-wrap">
      <div v-for="(item,index) in dialogHead"
           :key="index"
           class="list-item"
           :style="{width:item.width+'px'}">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="table-wrap">
      <div v-for="(itemData,index) in tableData"
           :key="index"
           class='sort-item-wrap center-align'>
        <div class="bold list-item"
             :style="{width:dialogHead[0].width+'px'}">
          <div class="serial-number center ft42"
               :style="serialStyle(itemData.ranking)">{{itemData.ranking}}</div>
        </div>
        <div :style="{width:dialogHead[1].width+'px'}"
             class="text-hidden ellipsis list-item">{{itemData.popularLineName}}</div>
        <div :style="{width:dialogHead[2].width+'px'}"
             class="list-item">{{itemData.popularLineHeat}}</div>
      </div>
    </div>
  </sl-dialog>

</template>

<script>
import SlDialog from '@/components/SlDialog.vue'
export default {
  name: 'LineData',
  components: { SlDialog },
  methods: {
    show () {
      this.findPopularLineList()
      this.dialogShow = true
    },
    findPopularLineList () {
      this.$api.findPopularLineList().then(res => {
        if (res.isError) return
        this.tableData = res?.content ?? []
      })
    },
  },
  data () {
    return {
      options: {
        title: '最受欢迎线路',
        isNeedBg: true,
        width: 1520,
        height: 1593
      },
      dialogShow: false,
      dialogHead: [
        {
          name: '排名',
          width: '340',
        },
        {
          name: '线路',
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