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
        <video :id="videoInfo.id"
               :key="index"
               :src="videoInfo.url"
               height="100px"
               controls></video>
      </div>
    </div>
  </div>
</template>

<script>
import background from '../../components/background'
import { tabs } from '../../common/videoTabs'

export default {
  data() {
    return {
      current: tabs[0].tab,
      tabs: tabs,
      videoList: [
        {
          id: 1,
          title: "this is test one video",
          url: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
        },
        {
          id: 2,
          title: "this is test two video",
          url: "../../../static/img/videoTest.mp4"
        }
      ]
    }
  },
  methods: {
    handleChangeScroll(e) {
      this.current = e.target.key
    }
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

