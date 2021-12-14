<template>
  <div id="app"
       :style="{transform: `scale(${scale})`}">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    initData () {
      const refreshTokenTime = 1000 * 60 * 60 * 3 // 四个小时

      setInterval(() => {
        this.refreshToken()
      }, refreshTokenTime)
    },

    refreshToken () {
      this.$api.findUserInfoById()
    },

    windowResize () {
      this.$store.dispatch('app/setScale', document.body.clientWidth / 3840)
      window.addEventListener('resize', (e) => {
        const scale = document.body.clientWidth / 3840
        this.$store.dispatch('app/setScale', scale)
      })
    }
  },
  data () {
    return {
    }
  },
  computed: {
    scale () {
      return this.$store.getters.scale
    }
  },
  mounted () {
    this.windowResize()
  },
  created () {
    this.initData()
  }
}
</script>

<style lang="scss">
@import "./styles/init.scss";
::-webkit-scrollbar {
  width: 20px;
  background-color: #26204c50;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #26204c;
}
</style>
