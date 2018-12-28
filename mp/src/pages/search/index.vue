<template>
  <div id="castm-search">
    <map id="castm-map"
         longitude="121.6147600000"
         latitude="38.9136900000"
         scale="16"
         :subkey="subkey"
         :markers="markers"
         @markertap="clickMarker($event)"></map>
  </div>
</template>
<script>
import { searchService } from "../../service/searchService"

export default {
  data() {
    return {
      subkey: 'IT5BZ-UVOWD-6EX4L-PX5ZR-FMWA5-HBF3U',
      markers: []
    }
  },
  onReady() {
    this.getUserInformations().then((p) => {
      this.markers = p
    })
  },
  methods: {
    async getUserInformations() {
      let result = await searchService.findUsersbyCurrentLocation(1, 1)
      return result
    },
    clickMarker(e) {
      let url = '../profile/main?id=' + e.mp.markerId
      wx.navigateTo({ url })
    }
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
  background: rgba(248, 248, 225, 0.6);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
}
#castm-search #castm-map {
  width: 100%;
  height: 100%;
}
</style>

