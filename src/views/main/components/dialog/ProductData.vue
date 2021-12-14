<template>
  <sl-dialog :options="options"
             :dialogShow.sync="dialogShow">
    <div class="list-wrap">
      <div v-for="(item,index) in dialogHead"
           :key="index"
           class="list-item"
           :style="{width:item.width+'px'}">
        <span>{{item.name}}</span>
        <img v-if="!$isEmpty(item.isSort)"
             :src="item.isSort === false ? require('@/assets/main/sort.png'):require('@/assets/main/sort-actived.png')"
             class="sort-img"
             @click="onSort(item)"
             mode="scaleToFill" />
      </div>
    </div>
    <div class="table-wrap">
      <div v-for="(itemData,index) in tableData"
           :key="index"
           class='sort-item-wrap center-align'>
        <div class="bold list-item"
             :style="{width:dialogHead[0].width+'px'}">
          <div class="serial-number center ft42"
               :style="serialStyle(index+1)">{{index+1}}</div>
        </div>
        <div :style="{width:dialogHead[1].width+'px'}"
             class="text-hidden ellipsis list-item">{{itemData.name}}</div>
        <div :style="{width:dialogHead[2].width+'px'}"
             class="list-item">{{itemData.visitorNum}}</div>
        <div :style="{width:dialogHead[3].width+'px'}"
             class="list-item">{{itemData.orderNum}}</div>
      </div>
    </div>
  </sl-dialog>

</template>

<script>
import SlDialog from '@/components/SlDialog.vue'
export default {
  name: 'Product',
  components: { SlDialog },
  methods: {
    show () {
      this.getCockpitProductList()
      this.dialogShow = true
    },
    onSort (item) {
      item.isSort = item.isSort !== true
      this.dialogHead = JSON.parse(JSON.stringify(this.dialogHead))
      this.getCockpitProductList()
    },
    getCockpitProductList () {
      const params = {
        orderBys: [
          {
            isDescending: this.dialogHead[2].isSort,
            propertyName: 'visitor_num'
          },
          {
            isDescending: this.dialogHead[3].isSort,
            propertyName: 'order_num'
          }
        ]
      }
      this.$api.getCockpitProductList(params).then(res => {
        if (res.isError) return
        this.tableData = res?.content ?? []
      })
    },
  },
  data () {
    return {
      options: {
        title: '优选产品',
        isNeedBg: true,
        width: 2120,
        height: 1593
      },
      dialogShow: false,
      dialogHead: [
        {
          name: '排名',
          width: '340',
        },
        {
          name: '联盟优选商品',
          width: '795'
        },
        {
          name: '热度',
          width: '460',
          isSort: false
        },
        {
          name: '订单数',
          width: '280',
          isSort: false
        },
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
  .sort-img {
    width: 48px;
    height: 42px;
    margin-left: 16px;
    cursor: pointer;
  }
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