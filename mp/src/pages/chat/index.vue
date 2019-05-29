<template>
  <div id="castm-chat">
    <scroll-view id="castm-chat-main"
                 scroll-y="true"
                 :scroll-into-view="'id-' + (chatList.length-2)">
      <div v-for="(chatItem, index) in chatList"
           :key="index">
        <i-avatar :class="chatItem.speaker == '1'?'float-right clear-both':'float-left clear-both'"
                  src="/static/img/game.png"
                  size="small"></i-avatar>
        <div v-if="chatItem.type === '1'"
             :id="'id-' + index"
             :class="chatItem.speaker == '1' ? 'float-right bg-right' : 'float-left bg-left'">
          {{chatItem.chat}}
        </div>
        <div v-if="chatItem.type === '2'"
             :id="'id-' + index"
             :class="chatItem.speaker === '1' ? 'float-right bg-right' : 'float-left bg-left'"
             :style="{ width : chatItem.chat + 'px', height : '40px'}"
             @click="audioPlay(chatItem)">
          <sound ref="childSound"
                 :position="chatItem.speaker === '1' ? 'left' :'right'"></sound>
        </div>
      </div>
    </scroll-view>
    <div id="castm-chat-footer">
      <div class="footer-row">
        <i-row>
          <i-col span="3">
            <div class="footer-icon">
              <i-icon :type="inputCategory"
                      size="30"
                      @click="changeCategory(inputCategory)" />
            </div>
          </i-col>
          <i-col span="17">
            <input v-if="inputCategory === 'translation'"
                   type="text"
                   class="footer-input"
                   :focus="isShowKeyboardFlag"
                   :cursor-spacing=10
                   :value="inputValue"
                   confirm-hold=true
                   @focus="controleKeyboard(true)"
                   @blur="controleKeyboard(false)"
                   @confirm="sendMessage($event)" />
            <button v-if="inputCategory === 'keyboard'"
                    hover-class="recordingStyle"
                    class="footer-button"
                    @touchstart="startRecord($event)"
                    @touchend="stopRecord($event)">{{recordInfo != null && recordInfo.isRecordingFlag? '松开 结束' : '按住 说话'}}</button>
          </i-col>
          <i-col span="4">
            <i-icon type="emoji"
                    size="30" />
            <i-icon type="add"
                    size="30" />
          </i-col>
        </i-row>
      </div>
    </div>
    <record ref="childRecord"></record>
  </div>
</template>

<script>

import record from '../../components/record'
import sound from '../../components/sound'
import { PAPA_CHATSERVER_URL } from '../../common/constant'

const chatList = [
  {
    speaker: '1',
    type: '1',
    chat: '你好'
  },
  {
    speaker: '2',
    type: '1',
    chat: '你好'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你叫什么,你多大'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你家是哪里的'
  },
  {
    speaker: '2',
    type: '1',
    chat: '我21,Dennis'
  },
  {
    speaker: '2',
    type: '1',
    chat: '今天天气真好啊'
  },
  {
    speaker: '1',
    type: '1',
    chat: '是啊 天气好'
  },
  {
    speaker: '1',
    type: '1',
    chat: '吃饭了吗'
  },
  {
    speaker: '2',
    type: '1',
    chat: '吃了 吃的鱼香肉丝'
  },
  {
    speaker: '1',
    type: '1',
    chat: '啊 伙食真好啊'
  },
  {
    speaker: '2',
    type: '1',
    chat: '好啥,吃饱就行呗'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你倒是不挑食哈,好养活'
  },
  {
    speaker: '1',
    type: '1',
    chat: '哈哈'
  },
  {
    speaker: '2',
    type: '1',
    chat: '嗯呐, 啥都吃'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你好'
  },
  {
    speaker: '2',
    type: '1',
    chat: '你好'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你叫什么,你多大'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你家是哪里的'
  },
  {
    speaker: '2',
    type: '1',
    chat: '我21,Dennis'
  },
  {
    speaker: '2',
    type: '1',
    chat: '今天天气真好啊'
  },
  {
    speaker: '1',
    type: '1',
    chat: '是啊 天气好'
  },
  {
    speaker: '1',
    type: '1',
    chat: '吃饭了吗'
  },
  {
    speaker: '2',
    type: '1',
    chat: '吃了 吃的鱼香肉丝'
  },
  {
    speaker: '1',
    type: '1',
    chat: '啊 伙食真好啊'
  },
  {
    speaker: '2',
    type: '1',
    chat: '好啥,吃饱就行呗'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你倒是不挑食哈,好养活'
  },
  {
    speaker: '1',
    type: '1',
    chat: '哈哈'
  },
  {
    speaker: '2',
    type: '1',
    chat: '嗯呐, 啥都吃'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你好'
  },
  {
    speaker: '2',
    type: '1',
    chat: '你好'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你叫什么,你多大'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你家是哪里的'
  },
  {
    speaker: '2',
    type: '1',
    chat: '我21,Dennis'
  },
  {
    speaker: '2',
    type: '1',
    chat: '今天天气真好啊'
  },
  {
    speaker: '1',
    type: '1',
    chat: '是啊 天气好'
  },
  {
    speaker: '1',
    type: '1',
    chat: '吃饭了吗'
  },
  {
    speaker: '2',
    type: '1',
    chat: '吃了 吃的鱼香肉丝'
  },
  {
    speaker: '1',
    type: '1',
    chat: '啊 伙食真好啊'
  },
  {
    speaker: '2',
    type: '1',
    chat: '好啥,吃饱就行呗'
  },
  {
    speaker: '1',
    type: '1',
    chat: '你倒是不挑食哈,好养活'
  },
  {
    speaker: '1',
    type: '1',
    chat: '哈哈'
  },
  {
    speaker: '2',
    type: '1',
    chat: '嗯呐, 啥都吃'
  },
  {
    speaker: '1',
    type: '2',
    chat: 50,
    filePath: 'wxfile://tmp_18dd016ff737e659158f030d4e835c58.mp3'
  },
  {
    speaker: '2',
    type: '2',
    chat: 80,
    filePath: 'wxfile://tmp_18dd016ff737e659158f030d4e835c58.mp3'
  },
  {
    speaker: '1',
    type: '2',
    chat: 120,
    filePath: 'wxfile://tmp_18dd016ff737e659158f030d4e835c58.mp3'
  }
]
const categoryList = ["keyboard", "translation"]
const recordInfo = {
  isRecordingFlag: false,
  startTime: null,
  endTime: null,
  width: 0,
  format: 'aac',
  filePath: ''
}
export default {
  data() {
    return {
      chatList: chatList,
      inputCategory: "keyboard",
      inputValue: "",
      isShowKeyboardFlag: false,
      recorderManager: {},
      innerAudioContext: {},
      recordInfo: null,
      isConnectingFlag: false
    }
  },
  created() {
  },
  onHide() {
  },
  onShow() {
    this.recorderManager = wx.getRecorderManager()
    this.recorderManager.onError((res) => {
      this.popupTip(res)
    })
    this.recorderManager.onStop((res) => {
      this.recordingCallback(res)
    })
    this.recorderManager.onInterruptionBegin(() => {
      this.recorderManager.stop()
    })
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.obeyMuteSwitch = false
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.innerAudioContext.onTimeUpdate(() => {
      console.log('更新了')
    })
    this.innerAudioContext.onEnded(() => {
      this.audioStop()
      console.log('播放结束')
    })
    this.innerAudioContext.onWaiting(() => {
      console.log('等待中...')
    })
    this.innerAudioContext.onError((res) => {
      this.audioStop()
      this.popupTip(res)
    })
  },
  onLoad() {
    wx.connectSocket({
      url: PAPA_CHATSERVER_URL,
      header: {
        'content-type': 'application/json'
      }
    })
    wx.onSocketMessage((res) => {
      console.log('接受到服务器内容: ', res)
      var result = JSON.parse(res.data)
      if (result.message !== '') {
        this.chatList.push({
          speaker: '2',
          type: '1',
          chat: result.message
        })
      }
    })
    wx.onSocketError((res) => {
      console.log('websocket connect error.', res)
    })
    wx.onSocketOpen((res) => {
      console.log('websocket has been connected successfully.', res)
      this.isConnectingFlag = true
    })
    wx.onSocketClose((res) => {
      console.log('websocket connection has been closed.', res)
    })
  },
  methods: {
    initChatMain() {
      var chatMainEle = document.getElementById('castm-chat-main')
      chatMainEle.scrollTop = chatMainEle.scrollHeight - chatMainEle.clientWidth
    },
    controleKeyboard(showKeyboard) {
      this.isShowKeyboardFlag = showKeyboard
    },
    sendMessage(e) {
      if (e != null) {
        let message = e.mp.value
        if (message != null && message != '' && typeof message != 'undefined') {
          this.sendWebSocketMessage(message)
        } else {
          // this.popupTip("发送内容不能为空")
          this.sendWebSocketMessage('test')
        }
      }
    },
    changeCategory(categoryValue) {
      if (categoryList.indexOf(categoryValue) > -1) {
        let index = categoryList.indexOf(categoryValue)
        this.inputCategory = index < categoryList.length - 1 ? categoryList[++index] : categoryList[0]
      }
    },
    startRecord(e) {
      this.recordInfo = recordInfo
      this.$refs.childRecord.startRecord()
      this.recordInfo.isRecordingFlag = true
      let startTimeStamp = e.mp.timeStamp
      let startTime = (startTimeStamp % (1000 * 60)) / 1000
      this.recordInfo.startTime = startTime
      this.recorderManager.start({
        format: this.recordInfo.format,
        duration: 20000,
        numberOfChannels: 1,
        sampleRate: 44100,
        encodeBitRate: 192000
      })
    },
    stopRecord(e) {
      this.$refs.childRecord.startRecord()
      this.recordInfo.isRecordingFlag = false
      let endTimeStamp = e.mp.timeStamp
      let endTime = (endTimeStamp % (1000 * 60)) / 1000
      this.recordInfo.endTime = endTime
      this.recorderManager.stop()
    },
    recordingCallback(result) {
      if (result != null && typeof result != 'undefined' && result.tempFilePath != null && result.tempFilePath != '') {
        this.recordInfo.filePath = result.tempFilePath
        let duration = this.recordInfo.endTime - this.recordInfo.startTime
        this.recordInfo.width = duration < 20 ? duration * 15 : 300
        this.recordInfo.width = this.recordInfo.width < 30 ? 30 : this.recordInfo.width
        this.sendWebSocketMessage()
      } else {
        this.popupTip('录音失败,请重试!')
      }
    },
    audioPlay(chatInfo) {
      let filePath = chatInfo.filePath
      if (filePath == '') {
        this.popupTip('语音失效')
      } else {
        this.innerAudioContext.src = filePath
        this.innerAudioContext.play()
      }
    },
    audioStop() {
      this.$refs.childSound.forEach((p, index) => {
        if (p.timer != null) {
          this.$refs.childSound[index].soundPlay()
        }
      })
    },
    popupTip(tip) {
      if (typeof tip === 'string') {
        wx.showModal({
          title: '错误',
          content: tip,
          showCancel: false,
          duration: 2000
        })
      } else {
        console.log(tip.errMsg)
      }
    },
    sendWebSocketMessage(content) {
      if (this.isConnectingFlag) {
        if (content == null || typeof content == 'undefined') {
          content = this.recordInfo.filePath
        }
        wx.sendSocketMessage({
          data: content,
          success: res => {
            content == null || typeof content == 'undefined' ? this.chatList.push({
              speaker: '1',
              type: '2',
              chat: this.recordInfo.width,
              filePath: this.recordInfo.filePath
            }) : this.chatList.push({
              speaker: '1',
              type: '1',
              chat: content
            })
            this.recordInfo = null
            this.inputValue = ''
          },
          fail: (err) => {
            this.recordInfo = null
            this.inputValue = ''
            this.popupTip(err)
          }
        })
      }
    }
  },
  components: {
    record,
    sound
  }
}
</script>

<style scoped>
#castm-chat {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
  background: rgba(248, 248, 225, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
  color: #80848f;
}

#castm-chat #castm-chat-main {
  position: relative;
  height: 92%;
  overflow-y: auto;
  line-height: 40px;
}

#castm-chat #castm-chat-main > div {
  display: block;
}

#castm-chat #castm-chat-footer {
  position: relative;
  height: 8%;
  background: rgba(248, 248, 225, 0.2);
  border-top: rgba(248, 248, 225, 0.6) 0.5px solid;
  box-shadow: #ffc95c 0px 0px 10px 1px;
}
.bg-right {
  background: #baf267;
  color: #628d41;
  margin: 5px 2px 5px 2px;
  border: #628d41 0.5px solid;
  border-radius: 10%;
}
.bg-left {
  background: #ffe6ea;
  color: #cb525b;
  margin: 5px 2px 5px 2px;
  border: #cb525b 0.5px solid;
  border-radius: 10%;
}

.float-left {
  float: left;
}
.float-right {
  float: right;
}

.clear-both {
  clear: both;
}

#castm-chat #castm-chat-footer .footer-icon {
  border: lightgray 0.5px solid;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-left: 10px;
}
#castm-chat #castm-chat-footer .footer-row {
  position: absolute;
  width: 100%;
  height: 35px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#castm-chat #castm-chat-footer .footer-input {
  background: #ffffff;
  height: 35px;
  border-radius: 5px;
  border: lightgray 0.5px solid;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  text-decoration: none;
}

#castm-chat #castm-chat-footer .footer-button {
  background: #ffffff;
  height: 35px;
  border-radius: 5px;
  font-size: 14px !important;
}
.recordingStyle {
  background: lightgray !important;
  color: #ffffff;
}
i-icon {
  color: #808695;
}
</style>