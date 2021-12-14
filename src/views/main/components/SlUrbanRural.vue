<template>
  <div class='urban-rural-wrap row'>
    <span @click="onDialog"
          class="more-img">
      <img src="@/assets/main/more.png"
           mode="scaleToFill" />
    </span>
    <sl-item-data class="item"
                  :options="item"
                  v-for="(item, index) in dataList"
                  :class="index > 2 && 'mt40'"
                  :key="index"></sl-item-data>
    <product-data ref="productDialog"></product-data>
  </div>
</template>

<script>
import ProductData from './dialog/ProductData'
export default {
  name: 'SlUrbanRural',
  components: { ProductData },
  methods: {
    getCityCountrysideMerge () {
      this.$api.getCityCountrysideMerge().then(res => {
        if (res.isError || !res.content) return
        const _keys = ['productNumber', 'activityNumber', 'activitySignUpNumber', 'customizationOrdersNumber', 'resourceSharingHeat', 'loanApplicantsNumber']
        this.dataList = this.dataList.map((item, i) => {
          const _key = _keys[i]
          item.number = res.content[_key]
          return item
        })
      })
    },
    onDialog () {
      this.$refs.productDialog.show()
    }
  },
  data () {
    return {
      dataList: [
        {
          title: '优选产品',
          number: 123,
          unit: '个'
        }, {
          title: '活动开展',
          number: 123,
          unit: '个'
        },
        {
          title: '活动报名',
          number: 123,
          unit: '人'
        },
        {
          title: '定制需求接单',
          number: 123,
          unit: '单'
        }, {
          title: '资源共享热度',
          number: 123
        },
        {
          title: '共富贷申请',
          number: 123,
          unit: '人'
        }
      ]
    }
  },
  created () {
    this.getCityCountrysideMerge()
  }
}
</script>

<style lang='scss' scoped>
.urban-rural-wrap {
  flex-wrap: wrap;
  position: relative;
  .more-img {
    left: 146px;
  }
  .item {
    width: 33%;
  }
}
</style>
