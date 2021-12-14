<template>
  <div class='main-wrap relative'
       @click="onPage">
    <div class="header">
      <sl-header></sl-header>
    </div>

    <div class="content row">
      <div class="side">
        <!-- 初心之旅 -->
        <sl-block :options="configTravel">
          <sl-original-travel></sl-original-travel>
        </sl-block>
        <!-- 城乡融合 -->
        <sl-block :options="configUrban"
                  class="mt50">
          <sl-urban-rural></sl-urban-rural>
        </sl-block>
        <!-- 基层治理 -->
        <sl-block :options="configGrassroots"
                  class="mt50">
          <sl-grassroots-governance></sl-grassroots-governance>
        </sl-block>

      </div>
      <div class="middle">
        <sl-block :options="configMap"
                  class="config-map">
          <sl-map ref="map"></sl-map>
        </sl-block>
        <!-- 驾驶舱信息 -->
        <sl-block :options="configCockpit">
          <sl-cockpit-info></sl-cockpit-info>
        </sl-block>

      </div>
      <div class="side">
        <!-- 党建联盟 -->
        <sl-block :options="configParty">
          <party-alliance></party-alliance>
        </sl-block>
        <!-- 人才服务 -->
        <sl-block class="mt48"
                  :options="configTalent">
          <talent-service></talent-service>
        </sl-block>
        <!-- 红盟大数据 -->
        <sl-block class="mt48"
                  :options="configBigData">
          <alliance-big-data></alliance-big-data>
        </sl-block>
      </div>
    </div>

  </div>
</template>

<script>
import SlHeader from './components/SlHeader.vue'
import SlBlock from '@/components/SlBlock.vue'
import SlMap from './components/SlMap'
import SlOriginalTravel from '@/views/main/components/SlOriginalTravel'
import SlUrbanRural from './components/SlUrbanRural.vue'
import PartyAlliance from './components/PartyAlliance.vue'
import TalentService from './components/TalentService.vue'
import AllianceBigData from './components/AllianceBigData.vue'
import SlGrassrootsGovernance from './components/SlGrassrootsGovernance.vue'
import SlCockpitInfo from './components/SlCockpitInfo.vue'
export default {
  name: 'index',
  methods: {
    onPage (e, point) {
      this.$refs.map.closeInfoWindow()
    }

  },
  components: { SlHeader, SlBlock, SlMap, SlOriginalTravel, SlUrbanRural, PartyAlliance, TalentService, AllianceBigData, SlGrassrootsGovernance, SlCockpitInfo },
  data () {
    return {
      infoStyle: {},
      currentPoint: {},
      configTravel: Object.freeze({
        title: '初心之旅',
        width: 980,
        height: 844
      }),
      configUrban: Object.freeze({
        title: '城乡融合',
        width: 980,
        height: 465
      }),
      configParty: Object.freeze({
        title: '党建联盟',
        width: 980,
        height: 899
      }),
      configTalent: Object.freeze({
        title: '人才服务',
        width: 980,
        height: 577
      }),
      configBigData: Object.freeze({
        title: '红盟大数据',
        width: 980,
        height: 304
      }),
      configGrassroots: Object.freeze({
        title: '基层治理',
        width: 980,
        height: 469
      }),
      configMap: Object.freeze({
        title: '党建联盟',
        isContentStyle: false,
      }),
      configCockpit: Object.freeze({
        width: 1663,
        height: 662
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.mt50 {
  margin-top: 50px;
}
.main-wrap {
  padding: 24px 60px 55px;
  color: #ffffff;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background-image: url("../../assets/bg.jpg");
  .content {
    background-repeat: no-repeat;
    background-size: 100% 100px;
    -moz-background-size: 100% 100px;
    background-image: url("../../assets/main/content-bg.png");
  }
  .middle {
    width: 1663px;
    margin: 0 48px;
    padding-top: 160px;
  }
  .config-map {
    background: none;
    padding: 0;
    .content-bg {
      background: none;
      padding: 0;
    }
  }
  .side {
    flex: 0.5;
  }

  .info-window {
    .title {
      img {
        height: 30px;
      }
      font-size: 17px;
    }
    position: absolute;
    padding: 20px;
    z-index: 5;
    width: 260px;
    transform: scale(2);
    transform-origin: 0 0;
    font-size: 15px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-image: url("~@/assets/map/introduce_bg.png");
  }
}
</style>
