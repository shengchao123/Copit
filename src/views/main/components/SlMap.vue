<template>
  <div class='map-wrap'>
    <div id="map"></div>

    <img src="@/assets/map/map.png"
         alt="">
  </div>
</template>

<script>
/* eslint-disable */
import AMap from 'AMap'
const LWH1 = { W: 75, H: 120 }
const LWH2 = { W: 180, H: 83 }
const MWH = { W: 40, H: 58 }
import Vue from 'vue/dist/vue.esm.js'
let overlays = new AMap.OverlayGroup()

export default {
  name: 'Map',
  methods: {
    initMap () {
      this.$map = new AMap.Map('map', {
        zoom: 10.1,
        labelzIndex: 111,
        center: [119.465056, 30.294302],
        pitch: 20,
        dragEnable: false,
        zoomEnable: false,
        disableSocket: true,
        viewMode: '3D',
        mapStyle: 'amap://styles/e43a677e65f1daa2be9e75ae06dc07b1'
      })
      // TODO: 地图边线对齐使用

      this.$map.on('click', this.mapClick)
      // this.searchBounds()
    },

    drawPoints () {
      const _temPoints = JSON.parse(JSON.stringify(this.points))
      // 绘制图标
      _temPoints.forEach((item, index) => {
        if (index !== this.currentIndex) {
          this.drawMarker('party.png', MWH, index, item)
        }
      })
      const _point = _temPoints[this.currentIndex]
      this.drawActiveMarker(this.currentIndex, _point)
    },

    drawActiveMarker (index, item) {

      if (!item || !item.lng || !item.lat) return
      const icon1 = new AMap.Icon({
        size: new AMap.Size(LWH1.W, LWH1.H),
        image: require('@/assets/map/party_l1.png'),
        imageSize: new AMap.Size(LWH1.W, LWH1.H)
      })
      const icon2 = new AMap.Icon({
        size: new AMap.Size(LWH2.W, LWH2.H),
        image: require('@/assets/map/party_l2.gif'),
        imageSize: new AMap.Size(LWH2.W, LWH2.H)
      })

      const marker2 = new AMap.Marker({
        position: new AMap.LngLat(item.lng, item.lat),
        map: this.$map,
        clickable: true,
        offset: new AMap.Pixel(0, -10),
        anchor: 'center',
        icon: icon2
      })

      const marker1 = new AMap.Marker({
        position: new AMap.LngLat(item.lng, item.lat),
        map: this.$map,
        clickable: true,
        animation: 'AMAP_ANIMATION_DROP',
        offset: new AMap.Pixel(0, -LWH1.H / 2),
        anchor: 'center',
        icon: icon1
      })



      overlays.addOverlay(marker1)
      overlays.addOverlay(marker2)
      // 设置 marker 绑定的数据
      marker1.setExtData(index)
      marker2.setExtData(index)
      marker2.setLabel({
        offset: new AMap.Pixel(0, -28),  //设置文本标注偏移量
        content: `<div style="color:#fcf050;font-size:16px">${item.abbreviation}</div>`, //设置文本标注内容
        direction: 'bottom' //设置文本标注方位
      });
      // 点击方法绑定
      marker1.on('click', this.markerClick)
      marker2.on('click', this.markerClick)
    },

    drawMarker (_img, _WH, index, item) {
      const icon = this.setIcon(_img, _WH)
      // 绘制标记气球
      const marker = new AMap.Marker({
        position: new AMap.LngLat(item.lng, item.lat),
        map: this.$map,
        clickable: true,
        offset: new AMap.Pixel(0, -_WH.H / 2),
        anchor: 'center',
        icon
      })
      marker.setLabel({
        offset: new AMap.Pixel(0, 5),  //设置文本标注偏移量
        content: `<div style="color:#fcf050;font-size:16px">${item.abbreviation}</div>`, //设置文本标注内容
        direction: 'bottom' //设置文本标注方位
      });
      overlays.addOverlay(marker)
      // 设置 marker 绑定的数据
      marker.setExtData(index)
      // 点击方法绑定
      marker.on('click', this.markerClick)
    },

    setIcon (_img, _WH) {
      const icon = new AMap.Icon({
        size: new AMap.Size(_WH.W, _WH.H),
        image: require('@/assets/map/' + _img),
        imageSize: new AMap.Size(_WH.W, _WH.H)
      })
      return icon
    },
    closeInfoWindow () {
      if (this.infoWindow) this.infoWindow.close()
    },
    mapClick (e) {
      this.closeInfoWindow()
    },
    markerClick (e) {
      const index = e.target.getExtData()
      if (this.currentIndex === index) return
      this.currentIndex = index
      this.showWindow = true
      overlays.hide()
      overlays.clearOverlays()
      this.drawPoints()

      this.showInfoWindow(e)
    },

    // 信息窗体
    showInfoWindow (e) {
      const marker = e.target
      const _point = this.points[this.currentIndex]

      const windowPosition = { ...marker.getPosition() }

      const img = require("@/assets/map/introduce_icon.png")

      var _this = this
      var MyComponent = Vue.extend({
        template: '<div class="info-window">' +
          '<div class="title bold center-align">' +
          `<img src="${img}">` +
          `<div class="ml12 ft17">${_point.name}</div>` +
          '</div>' +
          `<div class="mt16 ft15" style="line-height:20px;text-align: justify">${_point.introduction}</div>` +
          '</div>'
      })
      // 将新创建的子组件进行挂载
      var component = new MyComponent().$mount()
      // 将窗体内容添加到infoWindow中
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        content: component.$el, // 传入 dom 对象，或者 html 字符串
        offset: new AMap.Pixel(LWH1.W / 2, 0),
        anchor: 'bottom-left',
        autoMove: false
      })
      // 打开窗体
      this.infoWindow.open(this.$map, windowPosition)
    },
    lnglat2container (marker) {
      var pixel = this.$map.lngLatToContainer(marker.getPosition())
      return pixel
    },

    searchBounds () {
      const that = this
      const _opts = {
        subdistrict: 0,
        extensions: 'all'
      }
      // 高德地图行政区域查询
      AMap.plugin('AMap.DistrictSearch', function () {
        const _district = new AMap.DistrictSearch(_opts)
        _district.search('临安区', function (status, result) {
          var bounds = result.districtList[0].boundaries
          that.drawLines(bounds)
        })
      })
    },

    drawLines (bounds) {
      for (const item of bounds) {
        new AMap.Polyline({
          map: this.$map,
          path: item,
          strokeWeight: 2, // 轮廓线宽度
          strokeColor: '#7c1234' // 线条颜色
        })
      }
    },

    getJourneyAllianceAbbreviationList () {
      this.$api.getJourneyAllianceAbbreviationList().then(res => {
        if (res.isError) return
        this.points = res.content
        this.drawPoints()
      })
    }
  },

  data () {
    return {
      $map: null,
      showWindow: null,
      points: [],
      currentIndex: null,
    }
  },
  mounted () {
    this.initMap()
  },
  created () {
    this.getJourneyAllianceAbbreviationList()
  }
}
</script>

<style lang='scss' scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 860px;
  margin-bottom: 82px;
  margin-top: 64px;
  #map {
    position: absolute;
    top: -560px;
    left: -380px;
    z-index: 3;
    transform: scale(2);
    transform-origin: 0 0;
    width: 1400px;
    height: 770px;
  }
  img {
    position: absolute;
    top: -30px;
    left: 10px;
    z-index: 2;
    width: 820px;
    height: 460px;
    transform: scale(2);
    transform-origin: 0 0;
  }
}
</style>
