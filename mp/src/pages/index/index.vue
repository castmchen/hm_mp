<template>
  <div>
    <background></background>
    <div id="main_container">
      <home :currentTab="currentTab"
            @navigateToPage="navigateToPage"></home>
      <notification :currentTab="currentTab"></notification>
      <service :currentTab="currentTab"></service>
    </div>

    <div id="footer">
      <i-tab-bar :current="current"
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
      <i-badge :count="notificationCount"
               i-class-alone="demo-badge-alone" />
    </div>

    <div id="loading">
      <i-spin size="large"
              v-if="matteFlag"
              fix></i-spin>
    </div>
  </div>
</template>

<script>
import background from '../../components/background'
import home from '../../components/home'
import notification from '../../components/notification'
import service from '../../components/service'
import notificationServie from '../../service/notificationService'
import { mapActions, mapGetters } from 'vuex'

export default {
  data: {
    current: "",
    selectColor: "#f759ab",
    matteFlag: false
  },
  methods: {
    handleChange(e) {
      this.current = e.target.key
    },
    initNotifications() {
      let notifications = notificationServie.getNotificationsById('castm')
      if (notifications != null && typeof notifications != 'undefined' && notifications.length > 0) {
        this.update_notification(notifications)
      }
    },
    navigateToPage(url) {
      this.matteFlag = true
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
  created() {
    this.matteFlag = true
    this.currentTab = "home"
    this.initNotifications()
  },
  onShow() {
    this.matteFlag = false
  },
  components: { background, home, notification, service }
}
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

i-card {
  font-weight: 500;
}

i-badge {
  position: fixed;
  z-index: 999;
  bottom: 27px;
  left: 52.7%;
}
</style>
