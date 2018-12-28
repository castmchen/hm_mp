<template>
  <div>
    <div id="tabs">
      <i-tabs :current="current"
              color="#f759ab"
              scroll
              @change="handleChangeScroll">
        <i-tab v-for="tabInfo in tabs"
               :key="tabInfo.tab"
               :title="tabInfo.title"></i-tab>
      </i-tabs>
    </div>

    <div id="videos">
      <div v-for="(videoInfo, index) in videoList"
           :key="index">
        <span>{{videoInfo.title}}</span>
        <video :id="index"
               :key="index"
               :src="videoInfo.url"
               height="100px"
               controls></video>
      </div>
    </div>

    <i-load-more v-if="flagInfo.isLoadingFlag" />
    <i-toast id="toast" />
    <i-divider content="加载已经完成,没有更多数据"
               v-if="flagInfo.dividerFlag"></i-divider>
  </div>
</template>

<script>
import { tabs } from '../../common/videoTabs'
import * as videoApi from '../../common//apiConstant'
import { getVideoList } from '../../service/videoService'
import { mapActions, mapGetters } from 'vuex'

const { $Toast } = require('../../../static/iview/base/index.js')
var flagInfo = { isLoadingFlag: false, dividerFlag: false, httpFlag: false }
export default {
  data() {
    return {
      current: tabs[0].tab,
      tabs: tabs,
      flagInfo: flagInfo,
      videoList: [],
      count: 1
    }
  },
  methods: {
    handleChangeScroll(e) {
      if (this.flagInfo.httpFlag) {
        return
      }
      this.flagInfo.dividerFlag = false
      this.current = e.target.key
      this.initVideoList()
    },
    initVideoList(refresh) {
      if (this.flagInfo.httpFlag) {
        return
      }

      this.showFloat()
      var that = this
      let currentVideoInfo = this.getterVideoList(this.current)
      if (currentVideoInfo == null || currentVideoInfo.videos == null || currentVideoInfo.videos.length === 0) {
        this.count = 1
        this.videoList = []
      } else {
        if (!refresh) {
          this.videoList = []
          this.videoList = currentVideoInfo.videos
          this.hideFloat()
          return
        }
        this.count = currentVideoInfo.count + 1
      }
      this.getVideoListByApi(this.current).then(() => {
        that.videoList = that.getterVideoList(that.current).videos
        this.hideFloat()
      })
    },
    async getVideoListByApi(tabValue) {
      var that = this
      let targetUrl = this.getTargetUrl(tabValue, this.count)
      if (targetUrl != '') {
        try {
          var response = await getVideoList(targetUrl)
          var videoList = response.result
          if (videoList != null && typeof videoList != 'undefined' && videoList.length > 0) {
            await that.add_videoList({ tab: that.current, count: that.count, videos: videoList })
          } else {
            that.flagInfo.dividerFlag = true
          }
        } catch (e) {
          console.error('An error has occured.', e)
          that.hideFloat()
        }
      }
    },
    getTargetUrl(tabValue, count) {
      let url = this.tabs.find((tabInfo) => { return tabInfo.tab == tabValue }).url
      return videoApi.buildTargetUrl(url, count)
    },
    showFloat() {
      this.flagInfo.isLoadingFlag = true
      this.flagInfo.httpFlag = true
      // this.handleMask()
    },
    hideFloat() {
      this.flagInfo.isLoadingFlag = false
      this.flagInfo.httpFlag = false
      // $Toast.hide()
    },
    ...mapActions([
      "add_videoList"
    ]),
    handleMask() {
      $Toast({
        content: '视频加载中',
        type: 'loading',
        duration: 0,
        mask: false
      })
    }
  },
  computed: {
    ...mapGetters(["getterVideoList"])
  },
  created() {
  },
  onShow() {
    this.initVideoList()
  },
  onReachBottom() {
    this.initVideoList(true)
  }
}
</script>

<style scoped>
#tabs {
  /* position: fixed; */
  top: 0px;
  z-index: 3;
}

#videos div {
  position: flex;
  width: 90%;
  border-bottom: 1px solid #dddee1;
  margin-top: 3px;
  margin-left: 5%;
  border-radius: 15px;
  text-align: left;
  padding-bottom: 15px;
}

video {
  /* width: 95%; */
  /* margin-left: 1%; */
  height: 256rpx;
  width: 574rpx;
  position: relative;
  /* border-radius: 15px; */
  sborder-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  margin-top: 20rpx;
  margin-left: 48rpx;
  z-index: 2;
  display: block;
}

#videos div img {
  position: absolute;
  z-index: 999;
  height: 395rpx;
  width: 340px;
}

span {
  font-size: 12px;
  color: #80848f;
  margin-left: 12px;
}

#matte {
  z-index: 999;
}
</style>

