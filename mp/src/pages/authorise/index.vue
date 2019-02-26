<template>
  <div id="castm-authorise">
    <div class="section section1">
      <div class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <open-data type="userNickName"></open-data>
    </div>

    <div class="section section2">
      <span>申请获取以下权限</span>
      <br>
      <span>获得你的公开信息(昵称，头像等)</span>
    </div>

    <div class="section section3">
      <span>声明</span>
      <br>
      <span>
        <span style="font-size:16px; font-weight:300">1</span>.不进行授权本程序的使用将会受到限制<br>
        <span style="font-size:16px; font-weight:300">2</span>.对于您的个人信息，我们不会用于商用或者泄露给第三方<br>
        <span style="font-size:16px; font-weight:300">3</span>.程序内的操作与内容将严格遵守微信的规定
      </span>
    </div>

    <div class="section section4">
      <button open-type="getUserInfo"
              @getuserinfo="getAuthorize">授权</button>
    </div>

    <div id="castm-loading">
      <i-spin size="large"
              v-if="isLoadingFlag"
              fix></i-spin>
    </div>
  </div>
</template>

<script>
import wechat from '../../common/wechat.authorise'
import { mapActions } from 'vuex'
import JIMService from '../../common/jm.InitService'

export default {
  data() {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isLoadingFlag: false
    }
  },
  onLoad() {
  },
  methods: {
    getAuthorize(e) {
      if (e.mp.detail.userInfo) {
        this.isLoadingFlag = true
        wechat.login().then(async result => {
          if (result != null && result.sessionId) {
            const userCallback = await wechat.getUserInfo(result.sessionId)
            const userInfo = { sessionId: result.sessionId, userName: result.userId, nickName: userCallback.nickName, gender: userCallback.gender, avatarUrl: userCallback.avatarUrl, country: userCallback.country, province: userCallback.province, city: userCallback.city }
            this.update_userInfo(userInfo)
            await new Promise((resolve) => {
              JIMService.JMInit(resolve, userInfo)
            })
            wx.navigateBack({ delta: 1 })
          }
          this.isLoadingFlag = false
        }).catch(err => {
          console.error(`An error has been occured while getting user information, Details: ${err}`)
          this.isLoadingFlag = false
        })
      }
    },
    ...mapActions(['update_userInfo'])
  }
}
</script>

<style scoped>
#castm-authorise {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
  color: #80848f;
  background: #f8f8f9;
  position: absolute;
  height: 100%;
  width: 100%;
  line-height: 30px;
}

#castm-authorise .section4 button {
  background-color: #19be6b;
  color: #ffffff;
  width: 90%;
  height: 45px;
}

#castm-authorise .section {
  position: relative;
  display: flex;
  flex-direction: column;
}

#castm-authorise .section1 {
  width: 750rpx;
  height: 30%;
  color: black;
  align-items: center;
}

#castm-authorise .section2 {
  color: black;
  align-items: center;
  font-size: 14px;
  height: 20%;
}

#castm-authorise .section3 {
  line-height: 40px;
  border-top: 0.5px solid #e9eaec;
  border-bottom: 0.5px solid #e9eaec;
  height: 30%;
}

#castm-authorise .section4 {
  color: #ffffff;
  flex-direction: row !important;
  height: 20%;
  align-items: center;
}

#castm-authorise .userinfo-avatar {
  overflow: hidden;
  display: block;
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
  margin-top: 50rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

#castm-authorise .userinfo text {
  font-size: 14px;
  background-color: #c0c0c0;
  border-radius: 40%;
}
</style>

