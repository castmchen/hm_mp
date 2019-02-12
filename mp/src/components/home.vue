<template>
  <div class="home_container"
       v-if="currentTab == 'home'">
    <div class="avatar_container">
      <i-avatar v-if="userInfo == null"
                src="/static/img/unlogin.png"
                size="large"></i-avatar>
      <i-avatar v-if="userInfo != null"
                :src="userInfo.avatarUrl"
                size="large"></i-avatar>
    </div>
    <div class="ad_container">
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
  props: ['currentTab', 'userInfo'],
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
.home_container {
  display: flex;
  display: -webkit-flex;
  flex-flow: row wrap;
  justify-content: space-around;
  height: 100vh;
  align-items: flex-start;
  align-content: flex-start;
}

.home_container div {
  width: 100%;
}

.home_container .avatar_container {
  text-align: center;
}

.home_container .avatar_container i-avatar {
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.home_container .ad_container {
  border: 1rpx solid #dddee1;
  border-radius: 5%;
  text-align: center;
  height: 25vh;
  width: 90% !important;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}
.home_container .ad_container img {
  width: 100%;
  height: 100%;
}

/* #person-container {
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
} */
</style>

