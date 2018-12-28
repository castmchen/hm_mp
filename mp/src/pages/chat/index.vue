<template>
  <div id="castm-chat">
    <scroll-view id="castm-chat-main"
                 scroll-y="true"
                 :scroll-into-view="'id-' + (chatList.length-2)">
      <div v-for="(chatItem, index) in chatList"
           :key="index">
        <i-avatar :class="chatItem.speaker == '1'?'float-left clear-both':'float-right clear-both'"
                  src="/static/img/game.png"
                  size="small"></i-avatar>
        <span :id="'id-' + index"
              :class="chatItem.speaker == '1'?'float-left bg-left':'float-right bg-right'">
          {{chatItem.chat}}
        </span>
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
            <input v-if="inputCategory === 'keyboard'"
                   type="text"
                   class="footer-input"
                   :focus="isShowKeyboardFlag"
                   :cursor-spacing=300
                   :value="inputValue"
                   @focus="controleKeyboard(null, true)"
                   @blur="controleKeyboard(null, false)"
                   @confirm="controleKeyboard($event, false)" />
            <button v-if="inputCategory === 'translation'"
                    class="footer-button">按住撩</button>
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
  </div>
</template>

<script>

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
  }
]
const categoryList = ["keyboard", "translation"]
export default {
  data() {
    return {
      chatList: chatList,
      inputCategory: "keyboard",
      inputValue: "",
      isShowKeyboardFlag: false
    }
  },
  created() {
  },
  onHide() {
  },
  onLoad() {
  },
  methods: {
    initChatMain() {
      var chatMainEle = document.getElementById('castm-chat-main')
      chatMainEle.scrollTop = chatMainEle.scrollHeight - chatMainEle.clientWidth
    },
    controleKeyboard(e, showKeyboard) {
      if (e != null && !showKeyboard) {
        let message = e.mp.detail.value
        if (message != null && message != '' && typeof message != 'undefined') {
          this.chatList.push({
            speaker: '1',
            type: '1',
            chat: message
          })
          this.inputValue = ''
        }
      }
      this.isShowKeyboardFlag = showKeyboard
    },
    changeCategory(categoryValue) {
      if (categoryList.indexOf(categoryValue) > -1) {
        let index = categoryList.indexOf(categoryValue)
        this.inputCategory = index < categoryList.length - 1 ? categoryList[++index] : categoryList[0]
      }
    }
  },
  components: {
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
  line-height: 30px;
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
.bg-left {
  background: #baf267;
  color: #628d41;
  margin: 5px 2px 5px 2px;
  border: #628d41 0.5px solid;
  border-radius: 10%;
}
.bg-right {
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
  height: 30px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#castm-chat #castm-chat-footer .footer-input {
  background: #ffffff;
  height: 30px;
  border-radius: 5px;
  border: lightgray 0.5px solid;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  text-decoration: none;
}

#castm-chat #castm-chat-footer .footer-button {
  background: #ffffff;
  height: 30px;
  border-radius: 5px;
  font-size: 14px !important;
}
</style>