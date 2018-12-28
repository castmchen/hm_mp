<template>
  <div id="home"
       v-if="currentTab == 'home'">
    <div id="person-container">
      <i-avatar src="/static/img/unlogin.png"
                size="large"></i-avatar>
    </div>
    <div id="ad-container">
      <img src="/static/img/ad1.png" />
    </div>
    <div id="card_container">
      <i-card title="约一下"
              extra=">"
              thumb="/static/img/yue.png"
              @click="navigateTo('../dating/main')">
      </i-card>
      <i-card title="小视频"
              extra=">"
              thumb="/static/img/video.png"
              @click="navigateTo('../video/main')">
      </i-card>
      <i-card title="小游戏"
              extra=">"
              thumb="/static/img/game.png"
              @click="navigateTo('../game/main')">
      </i-card>
      <i-card title="段子"
              extra=">"
              thumb="/static/img/joke.png"
              @click="navigateTo('../joke/main')">
      </i-card>
      <i-card title="更多"
              extra=">"
              thumb="/static/img/more.png"
              @click="toggleDrawer">
      </i-card>
    </div>
    <div>
      <i-drawer mode="left"
                :visible="showDrawer"
                @close="toggleDrawer">
        <i-button @click="handleClick"
                  type="warning">敬请期待</i-button>
        <i-button @click="toggleDrawer"
                  type="info">取消</i-button>
      </i-drawer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentTab"],
  data() {
    return {
      showDrawer: false
    }
  },
  methods: {
    navigateTo(url) {
      this.$emit("navigateToPage", url)
    },
    toggleDrawer() {
      this.showDrawer = !this.showDrawer
    }
  }
}
</script>

<style scoped>
#person-container {
  text-align: center;
  margin-top: 5px;
}

#ad-container {
  height: 20vh;
  margin: 5px 16px 0px 16px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1rpx solid #dddee1;
  border-radius: 10px;
}

#ad-container img {
  width: 100%;
  height: 100%;
}
</style>

