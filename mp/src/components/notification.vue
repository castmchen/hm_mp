<template>
  <div id="notification"
       v-if="currentTab == 'notification'">
    <i-swipeout v-for="notification in notificationList"
                :key="notification.title"
                i-class="i-swipeout-item"
                :operateWidth="operateWidth">
      <div slot="content">
        <i-cell i-class="i-cell-padding"
                :title="notification.title"
                :label="notification.content">
        </i-cell>
      </div>
      <div slot="button"
           class="i-swipeout-button-group">
        <div class="i-swipeout-button-first-item">
          <i-icon size="24"
                  type="share_fill"
                  style="vertical-align: middle;"></i-icon>
        </div>
        <div class="i-swipeout-button-second-item"
             @click="removeNotification(notification.id)">
          <i-icon size="24"
                  type="delete_fill"></i-icon>
        </div>
      </div>
    </i-swipeout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    currentTab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      operateWidth: 210,
      needUpdateNotification: false
    }
  },
  beforeUpdate() {
  },
  computed: {
    ...mapGetters([
      "notificationList"
    ])
  },
  methods: {
    removeNotification(id) {
      this.remove_notification(id)
      this.needUpdateNotification = true
    },
    ...mapActions([
      "remove_notification"
    ])
  }
}
</script>

<style scoped>
#person_container {
  text-align: center;
  margin-top: 5px;
}

#ad_container {
  height: 20vh;
  margin: 5px 16px 0px 16px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1rpx solid #dddee1;
  border-radius: 10px;
}

#ad_container img {
  width: 100%;
  height: 100%;
}

.i-swipeout-button-group {
  height: 100%;
  width: 100%;
  position: absolute;
  color: #fff;
}

.i-swipeout-button-group .i-swipeout-button-first-item {
  display: inline-block;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0px;
  text-align: center;
  vertical-align: middle;
  line-height: 90px;
  background-color: #19be6b;
}

.i-swipeout-button-group .i-swipeout-button-second-item {
  display: inline-block;
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0px;
  text-align: center;
  vertical-align: middle;
  line-height: 90px;
  background-color: #ed3f14;
}
</style>

