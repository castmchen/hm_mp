<template>
  <div id="castm-notification">
    <div class="menu-item"
         v-for="notificationItem in notificationListForView"
         :key="notificationItem.index"
         v-bind:class="{'move-left':notificationItem.isShowAction}"
         v-bind:id="notificationItem.index"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove">
      <div class="menu-item-tag"
           v-if="notificationItem.isNew">
        <i-icon size="16"
                type="prompt_fill"></i-icon>
      </div>
      <div class="menu-item-avatar">
        <img src="https://i.loli.net/2017/08/21/599a521472424.jpg">
      </div>
      <div class="menu-item-main">
        <div class="menu-item-title">
          {{notificationItem.title}}
        </div>
        <div class="menu-item-content">
          {{notificationItem.content}}
        </div>
      </div>
      <div class="menu-item-action"
           @click="remove(notificationItem.index)">
        删除
      </div>
    </div>
    <!--
          <i-swipeout
          v-for="notification in notificationList"
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
            <div class="i-swipeout-button-second-item"
                 @click="removeNotification(notification.id)">
              <i-icon size="24"
                      type="delete_fill"></i-icon>
            </div>
          </div>
          </i-swipeout> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      notificationListForView: [],
      locationX: 0,
      locationY: 0,
      isNeedShow: false
    }
  },
  onLoad() {
    this.notificationList.forEach((notificationItem, index) => {
      this.notificationListForView.push({
        id: notificationItem.id,
        title: notificationItem.title,
        content: notificationItem.content,
        type: notificationItem.type,
        isNew: notificationItem.isNew,
        index: index,
        isShowAction: false
      })
    })
  },
  onShow() {
  },
  computed: {
    ...mapGetters([
      "notificationList"
    ])
  },
  methods: {
    onTouchStart(e) {
      this.locationX = e.mp.touches[0].clientX
      this.locationY = e.mp.touches[0].clientY
      for (let notificationItem of this.notificationListForView) {
        if (notificationItem.isShowAction && notificationItem.index == e.mp.currentTarget.id) {
          return
        } else if (notificationItem.isShowAction && this.locationX > 0 && this.locationY > 0) {
          continue
        } else if (notificationItem.isShowAction) {
          notificationItem.isShowAction = !notificationItem.isShowAction
        }
      }
    },
    onTouchMove(e) {
      const currentLocationX = e.mp.touches[0].clientX
      const currentLocationY = e.mp.touches[0].clientY
      const currentAngle = 360 * Math.atan((currentLocationY - this.locationY) / (currentLocationX - this.locationX)) / (2 * Math.PI)
      if (currentAngle < 45) {
        this.notificationListForView.forEach(notificationItem => {
          if (notificationItem.index == e.mp.currentTarget.id) {
            if (currentLocationX < this.locationX && !notificationItem.isShowAction) {
              notificationItem.isShowAction = !notificationItem.isShowAction
            } else if (currentLocationX > this.locationX && notificationItem.isShowAction) {
              notificationItem.isShowAction = !notificationItem.isShowAction
              this.locationX = 0
              this.locationY = 0
            }
          }
        })
      }
    },
    remove(index) {
      const notificationInfoForRemove = this.notificationListForView[index]
      this.notificationListForView.splice(index, 1)
      const notificationId = notificationInfoForRemove.id
      this.remove_notification(notificationId)
    },
    ...mapActions([
      "remove_notification"
    ])
  }
}
</script>

<style scoped>
#castm-notification {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
}

#castm-notification .menu-item {
  width: calc(100% + 50px);
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
  transform: translateX(0);
  transition: all 0.5s;
}

#castm-notification .menu-item:nth-child(2n) {
  /* background: #fde7e7; */
}

#castm-notification .menu-item .menu-item-avatar {
  width: 55px;
  height: 50px;
}

#castm-notification .menu-item .menu-item-main {
  flex-grow: 3;
  width: calc(100% - 55px);
  height: 50px;
  border-bottom: #e9eaec solid 0.5px;
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
  justify-content: center;
}

#castm-notification .menu-item .menu-item-avatar img {
  border-radius: 50%;
  width: 80%;
  height: 80%;
  margin-top: 5rpx;
  border: 2px solid #ffffff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

#castm-notification .menu-item .menu-item-avatar .rewriteBorder {
  border: 2px solid #cb525b !important;
}

#castm-notification .menu-item .menu-item-title {
  width: 100%;
  font-size: 18px;
  color: black;
}

#castm-notification .menu-item .menu-item-content {
  width: 100%;
  font-size: 12px;
}

#castm-notification .menu-item .menu-item-tag {
  position: absolute;
  top: -5px;
  width: 50px;
  height: 100%;
  color: #cb525b;
}

#castm-notification .menu-item .menu-item-action {
  width: 50px;
  height: 50px;
  background: #cb525b;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

#castm-notification .move-left {
  transform: translateX(-50px);
  transition: all 0.5s;
}

/*.i-swipeout-item {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  transition: transform 0.2s ease;
  font-size: 14px;
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
}  */
</style>

