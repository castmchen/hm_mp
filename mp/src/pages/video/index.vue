<template>
  <div id="castm-video">
    <div id="castm-header">
      <i-tabs :current="currentVideoTypeObj.tab"
              color="#f759ab"
              scroll
              @change="changeVideoTab">
        <i-tab v-for="videoType in videoTypeList"
               :key="videoType.tab"
               :title="videoType.title"
               :id="videoType.tab"></i-tab>
      </i-tabs>
    </div>

    <i-load-more v-if="isLoadingFlag && !isBottomFlag" />
    <i-divider content="加载已经完成,没有更多数据"
               v-if="isNomoreFlag && !isBottomFlag"></i-divider>

    <div id="castm-content">
      <div v-for="(videoInfo, index) in videoObjOfCurrentTab.videos"
           :key="index">
        <span>{{videoInfo.title}}</span>
        <video :id="index"
               :key="index"
               :src="videoInfo.url"
               height="100px"
               controls></video>
      </div>
    </div>

    <i-load-more v-if="isLoadingFlag && isBottomFlag" />
    <i-divider content="加载已经完成,没有更多数据"
               v-if="isNomoreFlag && isBottomFlag"></i-divider>
  </div>
</template>

<script>
import { VIDEOTYPELIST, getRealPlayUrl } from '../../common/constant'
import { getVideoList } from '../../service/videoService'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      currentVideoTypeObj: VIDEOTYPELIST[0],
      videoTypeList: VIDEOTYPELIST,
      videoObjOfCurrentTab: {},
      isLoadingFlag: false,
      isNomoreFlag: false,
      isBottomFlag: false
    }
  },
  methods: {
    changeVideoTab(e) {
      this.isLoadingFlag = this.isLoadingFlag ? !this.isLoadingFlag : this.isLoadingFlag
      this.isNomoreFlag = this.isNomoreFlag ? !this.isNomoreFlag : this.isNomoreFlag

      const selectedVideoType = this.videoTypeList.find(videoTypeInfo => { return videoTypeInfo.tab == e.mp.detail.key })
      this.currentVideoTypeObj = selectedVideoType
      const selectedVideoObj = this.getterVideoList(selectedVideoType.title)
      if (selectedVideoObj != null && typeof selectedVideoObj != 'undefined' && selectedVideoObj.videos.length) {
        this.videoObjOfCurrentTab = selectedVideoObj
      } else {
        this.videoObjOfCurrentTab = { key: selectedVideoType.title, fetchNumber: 0, videos: [] }
        wx.startPullDownRefresh({
          complete: () => {
            wx.stopPullDownRefresh()
          }
        })
      }
    },
    async getVideosByApi(keyword, number, pipeType) {
      if (typeof keyword == 'undefined' || typeof number == 'undefined') {
        wx.showToast({
          title: '资源获取失败, 请联系管理员!',
          icon: 'none'
        })
        return
      }
      this.isLoadingFlag = true
      const targetUrl = getRealPlayUrl(keyword, number)
      await getVideoList(targetUrl).then(res => {
        if (keyword == this.currentVideoTypeObj.title) {
          const callbackData = res.data.result
          if (callbackData != null && typeof callbackData != 'undefined' && callbackData.length) {
            this.add_videoList({ key: keyword, fetchNumber: number, videos: callbackData, pipeType })
            return true
          } else {
            this.isNomoreFlag = true
            return false
          }
        }
      }).then(flag => {
        if (flag && this.videoObjOfCurrentTab.key === keyword) {
          this.videoObjOfCurrentTab = this.getterVideoList(keyword)
        } else {
          this.isNomoreFlag = true
        }
      })
        .catch(err => {
          console.error(`An error has been occured while getting videos' information from url ${targetUrl}, Details: ${err}`)
          wx.showToast({
            title: '资源获取失败, 请联系管理员!',
            icon: 'none'
          })
        })
      this.isLoadingFlag = false
    },
    ...mapActions([
      "add_videoList"
    ])
  },
  computed: {
    ...mapGetters(["getterVideoList"])
  },
  onLoad() {
    this.isLoadingFlag = this.isLoadingFlag ? !this.isLoadingFlag : this.isLoadingFlag
    this.isNomoreFlag = this.isNomoreFlag ? !this.isNomoreFlag : this.isNomoreFlag

    const defaultVideoObj = this.getterVideoList(this.videoTypeList[0].title)
    if (defaultVideoObj != null && typeof defaultVideoObj != 'undefined' && defaultVideoObj.videos.length) {
      this.videoObjOfCurrentTab = defaultVideoObj
    } else {
      this.videoObjOfCurrentTab = { key: this.videoTypeList[0].title, fetchNumber: 0, videos: [] }
      wx.startPullDownRefresh({
        complete: () => {
          wx.stopPullDownRefresh()
        }
      })
    }
  },
  onPullDownRefresh() {
    this.isBottomFlag = false
    wx.stopPullDownRefresh()
    this.getVideosByApi(this.videoObjOfCurrentTab.key, this.videoObjOfCurrentTab.fetchNumber + 1, this.isBottomFlag)
  },
  onReachBottom() {
    this.isBottomFlag = true
    this.getVideosByApi(this.videoObjOfCurrentTab.key, this.videoObjOfCurrentTab.fetchNumber + 1, this.isBottomFlag)
  }
}
</script>

<style scoped>
#castm-video {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 18px;
  color: #80848f;
  background: #f8f8f9;
  width: 100%;
  min-height: 100vh;
}

#castm-video i-load-more {
  width: 100%;
}

#castm-video i-divider {
  width: 100%;
}

#castm-video #castm-content {
  width: 100%;
}

#castm-video #castm-content > div {
  display: flex;
  display: -webkit-flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #e9eaec;
  width: 100%;
}

#castm-video #castm-content > div span {
  font-size: 12px;
  line-height: 20px;
  color: black;
}

#castm-video #castm-content > div video {
  width: 90%;
  height: 146px;
  border-radius: 25px;
}
</style>

