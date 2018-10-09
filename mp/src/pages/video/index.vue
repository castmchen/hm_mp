<template>
  <div>
    <!-- <background></background> -->
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

    <div id="videos"
         style="margin-top:45px; z-index:1">

      <div v-for="(videoInfo, index) in videoList"
           :key="index">
        <img src="/static/img/tvborder.png" />
        <span>{{videoInfo.title}}</span>
        <video :id="index"
               :key="index"
               :src="videoInfo.url"
               height="100px"
               controls></video>
      </div>
    </div>
    <i-spin size="large"
            v-if="matteFlag"
            fix></i-spin>
  </div>
</template>

<script>
import background from '../../components/background'
import { tabs } from '../../common/videoTabs'
import * as videoApi from '../../common//apiConstant'
import { getVideoList } from '../../service/videoService'
import { validateErrorCode } from '../../utils/index'

export default {
  data() {
    return {
      current: '',
      tabs: tabs,
      matteFlag: false,
      videoList: [],
      count: 0
    }
  },
  methods: {
    handleChangeScroll(e) {
      this.current = e.target.key
    },
    initVideoList(videoListCallback) {
      if (videoListCallback == null || typeof videoListCallback != "object" || videoListCallback.length === 0) {
        // TODO => 提示没有更多数据
      }
      this.videoList = this.videoList.contact(videoListCallback)
    }
  },
  created() {
    this.matteFlag = true
    let defaultTabInfo = tabs[0]
    this.current = defaultTabInfo.tab
    let targetUrl = videoApi.buildTargetUrl(defaultTabInfo.url, this.count)
    console.log(targetUrl)
    console.log(encodeURI(targetUrl))
    getVideoList(encodeURI(targetUrl)).then(response => {
      let { resFlag, data } = validateErrorCode(response)
      if (resFlag) {
        this.initVideoList(data)
      }
    }).catch(e => {
      this.matteFlag = false
      console.error('An error has occured.', e)
    })
  },
  onShow() {
  },
  components: { background }
}
</script>

<style scoped>
#tabs {
  position: fixed;
  top: 0px;
}

#videos div {
  position: flex;
  width: 90%;
  border-bottom: 1px solid #dddee1;
  /* margin-top: 3px; */
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
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  margin-top: 22px;
  margin-left: 46rpx;
  z-index: 2;
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
</style>

