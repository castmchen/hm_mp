<template>
  <div id="castm-profile">
    <img :src="profile.avatar">
    <div class="profileDetails">
      <p>{{profile.name}}</p>
      <p>{{profile.description}}</p>
      <i-grid>
        <i-grid-item @click="navigateToMatch('../match/main')">
          <i-icon type="dynamic"
                  size="40"
                  color="#ffe056" />
          <i-grid-label>匹配度测试</i-grid-label>
        </i-grid-item>
        <i-grid-item>
          <i-icon type="like_fill"
                  size="40"
                  color="#fb8592" />
          <i-grid-label>喜欢&添加</i-grid-label>
        </i-grid-item>
        <i-grid-item>
          <i-icon type="emoji"
                  size="40"
                  color="#58b256" />
          <i-grid-label>打招呼</i-grid-label>
        </i-grid-item>
      </i-grid>
      <i-grid>
        <i-grid-item>
          <i-icon type="shop_fill"
                  size="40"
                  color="#CB525B" />
          <i-grid-label>小礼物(1RMB)</i-grid-label>
        </i-grid-item>
        <i-grid-item>
          <i-icon type="redpacket"
                  size="40"
                  color="#CB525B" />
          <i-grid-label>小红包(2RMB)</i-grid-label>
        </i-grid-item>
        <i-grid-item @click="share()">
          <i-icon type="share"
                  size="40"
                  color="#ffe6ea" />
          <i-grid-label>分享</i-grid-label>
        </i-grid-item>
      </i-grid>
    </div>

    <share :isShareFlag="isShareFlag"
           @cancleShare="listenCanleShare()"></share>
  </div>
</template>
<script>
import userService from '../../service/userService'
import share from '../../components/share'

export default {
  data() {
    return {
      profile: {},
      isShareFlag: false
    }
  },
  onLoad(options) {
    if (options.id == null || typeof options.id == "undefined") {
      wx.navigateBack()
    }
    this.isShareFlag = false
    var contactId = options.id
    this.getProfileById(contactId).then((p) => {
      this.profile = p
    })
    userService.getUserById(contactId).then(user => {
      this.profile = user
    })
  },
  methods: {
    navigateToMatch(url) {
      let targetUrl = url + '?contact=' + JSON.stringify(this.profile)
      wx.navigateTo({ url: targetUrl })
    },
    share() {
      this.isShareFlag = true
    },
    listenCanleShare() {
      this.isShareFlag = false
    }
  },
  components: {
    share
  }
}
</script>
<style scoped>
#castm-profile {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: rgba(248, 248, 225, 0.6);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
}

#castm-profile > img {
  height: 50%;
  border-radius: 50%;
  box-shadow: #ffffff 10px 10px 30px 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

#castm-profile .profileDetails {
  height: 50%;
  max-height: 50%;
  box-shadow: #ffffff 0px 0px 30px 5px inset;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#castm-profile .profileDetails p {
  line-height: 50px;
}

#castm-profile .profileDetails i-grid i-grid-item {
  text-align: center;
}
</style>

