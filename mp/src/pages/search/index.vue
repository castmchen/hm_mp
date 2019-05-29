<template>
  <div id="castm-search">
    <map id="castm-map"
         :longitude="locationInfo.lng"
         :latitude="locationInfo.lat"
         scale="15"
         :subkey="subkey"
         :markers="markers"
         @markertap="clickMarker($event)"></map>
    <i-spin size="large"
            v-if="isLoadingFlag"
            fix></i-spin>
  </div>
</template>
<script>
import searchService from '../../service/searchService'
import wechatService from '../../common/wechat.authorise'
import { TENCENTMAP_PRIVATE_APPKEY } from '../../common/constant'
import { mapGetters } from 'vuex'
import userService from '../../service/userService'

export default {
  data() {
    return {
      subkey: TENCENTMAP_PRIVATE_APPKEY,
      markers: [],
      locationInfo: { lng: 121.6147600000, lat: 38.9136900000 },
      isLoadingFlag: false
    }
  },
  created() {
  },
  onShow() {
    console.log('---------------------search-----------------------')
    console.log(this.userInfo)
    console.log(this.userInfo.userName)
    this.isLoadingFlag = true
    if (this.userInfo == null || typeof this.userInfo === 'undefined') {
      wx.navigateTo({ url: '/pages/authorise/main' })
      return
    }
    wechatService.getUserLocation(this.userInfo.userName).then(locationCallback => {
      if (locationCallback) {
        if (this.checkIsCNLocation(locationCallback.lng, locationCallback.lat)) {
          if (locationCallback.isNewLocation) {
            userService.updateUserLocation({ userId: this.userInfo.userName, lng: locationCallback.lng, lat: locationCallback.lat })
          }
          this.locationInfo = locationCallback
        }

        return searchService.getNearbyContacts(this.userInfo.userName, this.locationInfo.lng, this.locationInfo.lat)
      }
    }).then(markerCallback => {
      this.markers = markerCallback
      this.isLoadingFlag = false
    }).catch(err => {
      console.error(`An error has been occured while getting user location information, Details: ${err}`)
      wx.showToast({
        title: '页面初始化失败，请稍后重试!',
        icon: 'none'
      })
      setTimeout(() => {
        this.isLoadingFlag = false
        wx.navigateBack({ delta: 1 })
      }, 2000)
    })
  },
  methods: {
    clickMarker(e) {
      console.log(e.mp.markerId)
      let url = '../profile/main?id=' + e.mp.markerId
      wx.navigateTo({ url })
    },
    checkIsCNLocation(lng, lat) {
      return lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style scoped>
#castm-search {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100%;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
}
#castm-search #castm-map {
  width: 100%;
  height: 100%;
}
</style>

