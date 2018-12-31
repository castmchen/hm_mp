<template>
  <div v-if="isRecordingFlag"
       id="castm-record"
       class="voice-style">
    <div id="castm-record-main">
      <div class="bg-style"
           :animation="recordingAnimation1">
        <div class='v'>
        </div>
      </div>
      <div class="bg-style"
           :animation="recordingAnimation2">
        <div class='v'>
        </div>
      </div>
      <div class="bg-style"
           :animation="recordingAnimation3">
        <div class='v'>
        </div>
      </div>
      <image v-if="index==1"
             class="sound-style"
             src="../../static/img/voice_icon_speech_sound_1.png" />
      <image v-if="index==2"
             class="sound-style"
             src="../../static/img/voice_icon_speech_sound_2.png" />
      <image v-if="index==3"
             class="sound-style"
             src="../../static/img/voice_icon_speech_sound_3.png" />
      <image v-if="index==4"
             class="sound-style"
             src="../../static/img/voice_icon_speech_sound_4.png" />
      <image v-if="index==5"
             class="sound-style"
             src="../../static/img/voice_icon_speech_sound_5.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  name: 'record',
  data() {
    return {
      recordAnimation: {},
      isRecordingFlag: false,
      index: 1,
      timer: null,
      animation1: {},
      animation2: {},
      animation3: {},
      recordingAnimation1: {},
      recordingAnimation2: {},
      recordingAnimation3: {}
    }
  },
  onReady() {
    this.animation1 = wx.createAnimation({ duration: 1000 })
    this.animation2 = wx.createAnimation({ duration: 1000 })
    this.animation3 = wx.createAnimation({ duration: 1000 })
  },
  onLoad() {

  },
  methods: {
    startRecord() {
      if (!this.isRecordingFlag) {
        this.isRecordingFlag = !this.isRecordingFlag
        this.recording()
      } else {
        clearInterval(this.timer)
        this.isRecordingFlag = false
        this.index = 1
      }
    },
    recording() {
      let i = 1
      this.timer = setInterval(() => {
        i = i == 5 ? 1 : i
        ++i
        this.index = i
      }, 500)

      setTimeout(() => {
        this.animationFun(1, 1000)
      }, 0)
      setTimeout(() => {
        this.animationFun(2, 1000)
      }, 333)
      setTimeout(() => {
        this.animationFun(3, 1000)
      }, 666)
    },
    animationFun(index, time) {
      if (this.isRecordingFlag) {
        setTimeout(() => {
          this.animationFun(index, time)
        }, time)
      }
      switch (index) {
        case 1: {
          this.animation1.scale(1, 1).opacity(1).step({ duration: 0 })
          this.recordingAnimation1 = this.animation1.export()
          break
        }
        case 2: {
          this.animation2.scale(1, 1).opacity(1).step({ duration: 0 })
          this.recordingAnimation2 = this.animation2.export()
          break
        }
        case 3: {
          this.animation3.scale(1, 1).opacity(1).step({ duration: 0 })
          this.recordingAnimation3 = this.animation3.export()
          break
        }
      }

      setTimeout(() => {
        switch (index) {
          case 1: {
            this.animation1.scale(2.3, 2.3).opacity(0).step()
            this.recordingAnimation1 = this.animation1.export()
            break
          }
          case 2: {
            this.animation2.scale(2.3, 2.3).opacity(0).step()
            this.recordingAnimation2 = this.animation2.export()
            break
          }
          case 3: {
            this.animation3.scale(2.3, 2.3).opacity(0).step()
            this.recordingAnimation3 = this.animation3.export()
            break
          }
        }
      }, 100)
    }
  }
}
</script>

<style scoped>
.voice-style {
  /* margin-top: 400px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center; */
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 999;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

#castm-record-main {
  position: absolute;
  width: 150px;
  height: 150px;
  top: calc(50% - 75px);
  left: calc(50% - 75px);
  background: #17233d;
}
.bg-style {
  position: absolute;
  border-radius: 100%;
  border: 0.5px solid #ffffff;
  width: 70px;
  height: 70px;
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  background: rgba(30, 54, 42, 0.1);
}
.v {
  position: relative;
  height: 100%;
  width: 100%;
}
.v1 {
  position: absolute;
  top: 0;
}
.v2 {
  position: absolute;
  right: 0;
}
.v3 {
  position: absolute;
  bottom: 0;
}
.sound-style {
  position: absolute;
  width: 32px;
  height: 50px;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>


