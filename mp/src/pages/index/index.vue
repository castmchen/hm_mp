<template>
  <div id="castm-home">

    <div v-if="currentTab == '' || currentTab == 'home'"
         class="tap-section">
      <div id="castm-header">
        <div class="avatar-section">
          <open-data type="userAvatarUrl"></open-data>
        </div>
      </div>
      <div id="castm-content">
        <div class="ad-section">
          <img src="/static/img/ad1.png">
        </div>
        <div class="menu-section">
          <div class="menu-item">
            <i-card title="撩聊"
                    extra="㊤㊧"
                    thumb="/static/img/yue.png"
                    @click="navigateTo('../dating/main')">
            </i-card>
          </div>
          <div class="menu-item">
            <i-card title="视频"
                    extra="㊤㊨"
                    thumb="/static/img/video.png"
                    @click="navigateTo('../video/main')">
            </i-card>
          </div>
          <div class="menu-item margin-top-10">
            <i-card title="游戏"
                    extra="㊦㊧"
                    thumb="/static/img/game.png"
                    @click="navigateTo('../game/main')">
            </i-card>
          </div>
          <div class="menu-item margin-top-10">
            <i-card title="段子"
                    extra="㊦㊨"
                    thumb="/static/img/joke.png"
                    @click="navigateTo('../joke/main')">
            </i-card>
          </div>
          <div class="menu-item margin-top-10">
            <div class="menu-item-cover"></div>
            <i-card title="更多"
                    extra="㊣"
                    thumb="/static/img/more.png"
                    @click="controlShowMore">
            </i-card>

            <div>
              <i-drawer mode="right"
                        :visible="isShowMoreFlag">
                <i-button @click="controlShowMore()"
                          type="info">敬请期待</i-button>
              </i-drawer>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentTab === 'favorite'"
         class="tap-section">
      <favoriteTab></favoriteTab>
    </div>

    <div v-if="currentTab === 'notification'"
         class="tap-section">
      <notificationTab></notificationTab>
    </div>

    <div v-if="currentTab === 'service'"
         class="tap-section">
      <serviceTab></serviceTab>
    </div>

    <div id="castm-footer">
      <i-tab-bar :current="currentTab"
                 :color="selectColor"
                 @change="changeTab">
        <i-tab-bar-item key="home"
                        icon="homepage"
                        current-icon="homepage_fill"
                        title="主页">
        </i-tab-bar-item>
        <i-tab-bar-item key="favorite"
                        icon="like"
                        current-icon="like_fill"
                        title="附近的圈子">
        </i-tab-bar-item>
        <i-tab-bar-item key="notification"
                        icon="remind"
                        current-icon="remind_fill"
                        title="通知">
        </i-tab-bar-item>
        <i-tab-bar-item key="service"
                        icon="customerservice"
                        current-icon="customerservice_fill"
                        title="服务中心"></i-tab-bar-item>
      </i-tab-bar>
      <div id="castm-footer-notificationtip">
        <i-badge :count="notificationCount"
                 i-class-alone="demo-badge-alone" />
      </div>
    </div>
    <div id="castm-loading">
      <i-spin size="large"
              v-if="isLoadingFlag"
              fix></i-spin>
    </div>
  </div>
</template>

<script>
// import JIMService from '../../common/jm.InitService'
import wechat from '../../common/wechat.authorise'
import notificationTab from '../../components/notification'
import serviceTab from '../../components/service'
import favoriteTab from '../../components/favorite'
import { notificationService } from '../../service/notificationService'
import { mapActions, mapGetters } from 'vuex'

export default {
  data: {
    currentTab: "home",
    selectColor: "#f759ab",
    isLoadingFlag: false,
    isShowMoreFlag: false
  },
  methods: {
    changeTab(e) {
      this.currentTab = e.target.key
    },
    initNotifications() {
      let notifications = notificationService.getNotificationsById('castm')
      if (notifications != null && typeof notifications != 'undefined' && notifications.length > 0) {
        this.update_notification(notifications)
      }
    },
    navigateTo(url) {
      wx.navigateTo({ url })
    },
    navigateToPage(url) {
      wx.navigateTo({ url })
    },
    controlShowMore() {
      this.isShowMoreFlag = !this.isShowMoreFlag
    },
    checkLoginStatus() {
      return new Promise((resolve, reject) => {
        if (!this.userInfo) {
          resolve(false)
        } else {
          return wechat.checkSessionValid(resolve).catch(err => {
            this.isLoadingFlag = false
            console.error(`An error has been occured while checking session validity, Details: ${err}`)
            wx.navigateTo({ url: '/pages/authorise/main' })
          })
        }
      })
    },
    ...mapActions([
      'update_notification',
      'get_notificationById',
      'remove_notification',
      'add_notification',
      'update_userInfo'
    ])
  },
  computed: {
    ...mapGetters(['notificationCount', 'userInfo'])
  },
  onLoad() {
  },
  created() {
    this.isLoadingFlag = true
    this.currentTab = "home"
  },
  onShow() {
    this.initNotifications()
    this.checkLoginStatus().then(isLogin => {
      if (!isLogin) {
        wx.navigateTo({ url: '/pages/authorise/main' })
      }
      this.isLoadingFlag = false
    })
    // if (!this.userInfo) {
    //   wx.navigateTo({ url: '/pages/authorise/main' })
    //   return
    // }
  },
  components: { favoriteTab, notificationTab, serviceTab }
}
</script>

<style scoped>
#castm-home {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  color: #80848f;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-flow: row wrap;
  align-content: space-between;
  background: #f8f8f9;
}

#castm-home > .tap-section {
  width: 100%;
  flex-grow: 5;
}

#castm-home #castm-header {
  width: 100%;
  z-index: 999;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

#castm-home #castm-header .avatar-section {
  overflow: hidden;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

#castm-home #castm-content {
  width: 100%;
  min-height: 75vh;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
}

#castm-home #castm-content .ad-section {
  width: 90%;
  height: 25vh;
  border: #e9eaec solid 0.5px;
  border-radius: 5%;
  overflow: hidden;
}

#castm-home #castm-content .ad-section img {
  width: 100%;
  height: 100%;
}

#castm-home #castm-content .menu-section {
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

#castm-home #castm-content .menu-section .menu-item {
}

#castm-home #castm-content .menu-section .menu-item:first-child {
  /* border-right: #e9eaec solid 0.5px; */
  /* border-bottom: #e9eaec solid 0.5px; */
  width: 40%;
}

#castm-home #castm-content .menu-section .menu-item:nth-child(2n) {
  /* border-bottom: #e9eaec solid 0.5px; */
  background: #d1edf9;
  border-radius: 5px;
  width: 50%;
}

#castm-home #castm-content .menu-section .menu-item:nth-child(3n) {
  /* border-right: #e9eaec solid 0.5px; */
  background: #fde7e7;
  border-radius: 5px;
  width: 50%;
}

#castm-home #castm-content .menu-section .menu-item:nth-child(4n) {
  /* border-bottom: #ffffff solid 0.5px; */
  background: #ffffff;
  width: 40%;
}

#castm-home #castm-content .menu-section .menu-item:last-child {
  width: 100%;
  background: #c1c4d1;
  border-radius: 5px;
}

#castm-home
  #castm-content
  .menu-section
  .menu-item:last-child
  .menu-item-cover {
  width: 40%;
  height: 100%;
  background: #ffffff;
  position: absolute;
}

#castm-home #castm-footer {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-flow: row wrap;
}

#castm-home #castm-footer i-tab-bar {
  width: 100%;
}

#castm-home #castm-footer #castm-footer-notificationtip {
  margin-left: -34%;
}

.margin-top-10 {
  margin-top: 10px;
}
</style>
