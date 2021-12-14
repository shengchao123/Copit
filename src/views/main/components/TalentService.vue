<template>
  <div class='talent-service-wrap between-row'>
    <div>
      <sl-item-data :options="{title: '政策发布', number: talentServiceData.policyNumber || 0, unit: '项'}"></sl-item-data>
      <sl-item-data class="pt32 pb32"
                    :options="{title: '线上问诊', number: talentServiceData.onlineConsultationSatisfaction || 0, unit: '次'}">
      </sl-item-data>
      <sl-item-data
                    :options="{title: '线上问诊满意率', number: talentServiceData.onlineConsultationSatisfactionRate || 0, unit: '%'}">
      </sl-item-data>
    </div>
    <div>
      <div class="flex">
        <sl-item-data :options="{title: '直补申请', number: talentServiceData.directApplicationNumber || 0, unit: '个'}">
        </sl-item-data>
        <sl-item-data class="ml189"
                      :options="{title: '专家入驻', number: talentServiceData.expertNumber || 0, unit: '人'}"></sl-item-data>
        <!-- <sl-item-data :options="{title: '联盟纳贤需求', number: talentServiceData.postNumber || 0, unit: '个'}"></sl-item-data>
        <sl-item-data class="pt32 pb32"
                      :options="{title: '浏览热度', number: talentServiceData.postBrowseHeat || 0}"></sl-item-data> -->

      </div>
      <div>
        <div class="mt8">
          <div v-for="(item, index) in progressBarData"
               :key="index"
               class="mt12">
            <div class="between-row">
              <span class="ft28"
                    style="color: #e0e0e2">{{item.title}}</span>
              <div :style="{color: item.color}">
                <span class="ft30">{{item.value}}</span>
                <span class="ft24">%</span>
              </div>
            </div>
            <div class="progress-bar mt8 center-align"
                 :style="{borderColor: item.borderColor}">
              <div class="bar"
                   :style="{width: item.value + '%', background: item.barColor}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'talentService',
  methods: {
    setProgressBarData (data) {
      if (!data) return
      const { callsNumberRate, messageNumberRate, visitNumberRate } = data
      const progressBarData = this.progressBarData
      progressBarData[0].value = callsNumberRate
      progressBarData[1].value = messageNumberRate
      progressBarData[2].value = visitNumberRate
      this.progressBarData = progressBarData
    },
    getTalentService () {
      this.$api.getTalentService().then(res => {
        if (res.isError) return
        this.talentServiceData = res.content || {}
        this.setProgressBarData(res.content)
      })
    }
  },
  data () {
    return {
      talentServiceData: {},
      progressBarData: [
        {
          title: '电话',
          value: 0,
          color: '#ed452d',
          borderColor: '#cf3d28',
          barColor: 'linear-gradient(90deg, #cf3d28 0%, rgba(239, 69, 45, 0.38) 99%, rgba(239, 69, 45, 0.38) 100%)'
        },
        {
          title: '留言',
          value: 0,
          color: '#f9d384',
          borderColor: '#dba73b',
          barColor: 'linear-gradient(90deg, #f1be14 0%, rgba(250, 213, 139, 0.38) 99%, rgba(250, 213, 140, 0.38) 100%)'
        },
        {
          title: '实地走访',
          value: 0,
          color: '#55a10f',
          borderColor: '#55a30d',
          barColor: 'linear-gradient(90deg, #55a30d 0%, rgba(117, 203, 37, 0.38) 100%)'
        }
      ]
    }
  },
  created () {
    this.getTalentService()
  }
}
</script>
<style lang='scss' scoped>
.ml189 {
  margin-left: 189px;
}
.talent-service-wrap {
  .progress-bar {
    width: 535px;
    height: 34px;
    border-radius: 18px;
    padding: 5px;
    box-sizing: border-box;
    border: solid 1px #fff;
    .bar {
      width: 0%;
      height: 24px;
      border-radius: 12px;
      transition: all 0.4s;
    }
  }
}
</style>
