<template>
  <div class='alliance-big-data-wrap center-align between-row'>
    <sl-item-data :options="{title: '累计访问人次', number: allianceData.accumulativeVisitsNumber || 0, unit: '次'}">
    </sl-item-data>
    <sl-item-data :options="{title: '累计用户', number: allianceData.accumulativeUser || 0, unit: '个'}"></sl-item-data>
    <div>
      <div class="ft32"
           style="color: #e0e0e2">今日新增用户</div>
      <div class="flex"
           style="align-items: flex-end">
        <sl-item-data :options="{number: allianceData.todayNewUserNumber, unit: '个'}"></sl-item-data>
        <div class="ft26 ml20">
          <span class="mr8">较昨日</span>
          <span :style="{color: allianceData.rate < 0 ? '#ed452d' : '#509831'}">
            {{allianceData.rate >= 0 ? '+' : ''}}{{allianceData.rate}}%
          </span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'allianceBigData',
  methods: {
    getRedUnitaData () {
      this.$api.getRedUnitaData().then(res => {
        if (res.isError) return
        this.allianceData = res.content || {}
      })
    }
  },
  data () {
    return {
      allianceData: {}
    }
  },
  created () {
    this.getRedUnitaData()
  }
}
</script>
<style lang='scss' scoped>
.alliance-big-data-wrap {
}
</style>
