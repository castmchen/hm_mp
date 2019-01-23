<template>
  <div id="castm-home">
    <div id="castm-main">
      <home :currentTab="currentTab"
            @navigateToPage="navigateToPage"></home>
      <notification :currentTab="currentTab"></notification>
      <service :currentTab="currentTab"></service>
    </div>

    <div id="castm-footer">
      <i-tab-bar :current="currentTab"
                 :color="selectColor"
                 @change="handleChange">
        <i-tab-bar-item key="home"
                        icon="homepage"
                        current-icon="homepage_fill"
                        title="主页">
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
      <div id="castm-footer-notificationBadge">
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
import global from '../../common/global'
import JIMInit from '../../common/jm.InitService'
import home from '../../components/home'
import notification from '../../components/notification'
import service from '../../components/service'
import { notificationService } from '../../service/notificationService'
import { mapActions, mapGetters } from 'vuex'

export default {
  data: {
    currentTab: "",
    selectColor: "#f759ab",
    isLoadingFlag: false
  },
  methods: {
    handleChange(e) {
      this.currentTab = e.target.key
    },
    initNotifications() {
      let notifications = notificationService.getNotificationsById('castm')
      if (notifications != null && typeof notifications != 'undefined' && notifications.length > 0) {
        this.update_notification(notifications)
      }
    },
    navigateToPage(url) {
      this.isLoadingFlag = true
      wx.navigateTo({ url })
    },
    ...mapActions([
      "update_notification",
      "get_notificationById",
      "remove_notification",
      "add_notification"
    ])
  },
  computed: {
    ...mapGetters(["notificationCount"])
  },
  onLoad() {
    if (global.username === '') {
      wx.navigateTo({ url: '../authorise/main' })
    }
    JIMInit.JMInit()

    this.isLoadingFlag = true
    this.currentTab = "home"
    this.initNotifications()
  },
  created() {
  },
  onShow() {
    this.isLoadingFlag = false
  },
  components: { home, notification, service }
}
</script>

<style scoped>
#castm-home {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
  color: #80848f;
}

#castm-home #castm-main {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100%;
  height: 100%;
  background: rgba(248, 248, 225, 0.6);
}

#castm-home #castm-footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

#castm-home #castm-footer #castm-footer-notificationBadge {
  position: absolute;
  z-index: 999;
  bottom: 30px;
  left: calc(50% + 5px);
}
</style>
