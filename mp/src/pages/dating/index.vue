<template>
  <div id="castm-dating">
    <div id="castm-search">
      <!-- <div>
        <i-icon type="coordinates_fill"
                size="50"
                color="#ffffff"
                @click="navigateToSearch('../search/main')" />
        <span>附近撩</span>
      </div>
      <div>
        <i-icon type="browse_fill"
                size="50"
                color="#ffffff"
                @click="navigateToSearch('../chat/main')" />
        <span>八分撩</span>
      </div> -->
      <div class="near-by">
        <span>撩聊</span>
        <div class="menu-item-avatar">
          <img src="../../../static/img/robot/4.jpg">
        </div>
        <span>附近</span>
      </div>
      <div id="castm-selection"
           v-bind:class="{'move-left': positionNumber == -1, 'move-none': positionNumber == 0, 'move-right': positionNumber == 1}"
           @touchstart="onTouchStart"
           @touchmove="onTouchMove"
           @touchend="onTouchEnd">
        左滑 | 右滑
      </div>
      <div class="minutes-8">
        <span>八分</span>
        <div class="menu-item-avatar">
          <img src="../../../static/img/robot/10.jpg">
        </div>
        <span>撩聊</span>
      </div>
    </div>

    <div id="castm-contactList">
      <div class="contact-row-"
           v-for="(contactInfo, index) in contactList"
           :key="index">
        <div class="contact-row-Left">
          <i-avatar :src="contactInfo.avatar"
                    size="large"></i-avatar>
          <span>
            {{contactInfo.name}}
          </span>
        </div>
        <div class="contact-row-right">
          <i-icon type="message"
                  size="25"
                  @click="navigateToChat(contactInfo)" />
          <i-icon type="other"
                  size="25"
                  @click="showMoreActions(contactInfo)" />
        </div>
      </div>
    </div>
    <div>
      <i-drawer mode="right"
                :visible="selectedContact != null"
                @close="hideMoreActions">
        <i-icon type="message"
                size="30"
                @click="navigateToChat()" />
        <i-icon type="dynamic"
                size="30"
                @click="navigateToMatch('../match/main')" />
        <i-icon type="shop_fill"
                size="30" />
        <i-icon type="redpacket"
                size="30" />
        <i-icon type="share"
                size="30"
                @click="share()" />
        <i-icon type="trash"
                size="30"
                @click="removeContact()" />
      </i-drawer>
    </div>
    <div id="castm-loading">
      <i-spin size="large"
              v-if="isLoadingFlag"
              fix></i-spin>
    </div>
    <!-- <share :isShareFlag="isShareFlag"
           @cancleShare="listenCancleShare()"></share> -->
  </div>
</template>

<script>
import datingService from '../../service/datingService'
import share from '../../components/share'

export default {
  data() {
    return {
      contactList: [],
      selectedContact: null,
      isLoadingFlag: false,
      isShareFlag: false,
      positionNumber: 0,
      locationX: 0,
      locationY: 0
    }
  },
  created() {
    datingService.getContactList().then(contactList => {
      this.contactList = contactList
    })
  },
  onHide() {
    this.isLoadingFlag = false
  },
  onShow() {
    this.isShareFlag = false
    this.isLoadingFlag = false
    this.positionNumber = 0
  },
  methods: {
    showMoreActions(contactInfo) {
      this.selectedContact = contactInfo
    },
    hideMoreActions() {
      this.selectedContact = null
    },
    removeContact() {
      this.isLoadingFlag = true
      datingService.removeSpecifiedContact(this.selectedContact).then((contactList) => {
        this.contactList = contactList
        this.hideMoreActions()
        this.isLoadingFlag = false
      })
    },
    navigateToMatch(url) {
      let targetUrl = url + '?contact=' + JSON.stringify(this.selectedContact)
      wx.navigateTo({ url: targetUrl })
    },
    navigateToSearch(url) {
      wx.navigateTo({ url })
    },
    navigateToChat(selectedContact) {
      if (selectedContact === null | typeof selectedContact === 'undefined') {
        selectedContact = this.selectedContact
      }
      let targetUrl = '../chat/main' + '?contact=' + JSON.stringify(selectedContact)
      wx.navigateTo({ url: targetUrl })
    },
    share() {
      this.isShareFlag = true
    },
    listenCancleShare() {
      this.isShareFlag = false
    },
    onTouchStart(e) {
      this.isLoadingFlag = true
      this.locationX = e.mp.touches[0].clientX
      this.locationY = e.mp.touches[0].clientY
    },
    onTouchMove(e) {
      const currentLocationX = e.mp.touches[0].clientX
      const currentLocationY = e.mp.touches[0].clientY
      const currentAngle = 360 * Math.atan((currentLocationY - this.locationY) / (currentLocationX - this.locationX)) / (2 * Math.PI)

      console.log('----------------move-----------------')
      console.log(currentLocationX)
      if (currentAngle < 10) {
        currentLocationX < this.locationX ? this.positionNumber = -1 : this.positionNumber = 1
        console.log(this.locationX)
        e.preventDefault()
      }

      if (this.positionNumber == -1 && currentLocationX < this.locationX) {
        wx.navigateTo({ url: '/pages/search/main' })
      } else if (this.positionNumber == 1 && currentLocationX > this.locationX) {
        wx.navigateTo({ url: '/pages/chat/main' })
      } else {
        this.positionNumber = 0
        this.locationX = 0
        this.locationY = 0
      }
      this.isLoadingFlag = false
    },
    onTouchEnd(e) {
      const currentLocationX = e.mp.changedTouches[0].clientX

      console.log('position' + this.positionNumber)
      if (this.positionNumber == -1 && currentLocationX < this.locationX) {
        wx.navigateTo({ url: '/pages/search/main' })
      } else if (this.positionNumber == 1 && currentLocationX > this.locationX) {
        wx.navigateTo({ url: '/pages/chat/main' })
      } else {
        this.positionNumber = 0
        this.locationX = 0
        this.locationY = 0
      }
      this.isLoadingFlag = false
    }
  },
  components: {
    share
  }
}
</script>

<style scoped>
#castm-dating {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
  display: flex;
  display: -webkit-flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: space-around;
}

#castm-dating #castm-search {
  width: 100%;
  height: 60px;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid #ffced3;
  border-bottom: 3px solid #ffced3;
  background-color: #ffe6ea;
  color: #ffffff;
}

#castm-dating #castm-search #castm-selection {
  background-color: #8bab68;
  width: 40%;
  height: 40px;
  border-radius: 50px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  box-shadow: #4d892e 5px 5px 20px 0px;
  /* transform: translateX(0);
  transition: all 0.5s; */
  z-index: 1;
}

#castm-dating #castm-search .move-left {
  transform: translateX(-60%);
  transition: all 0.5s;
}

#castm-dating #castm-search .move-none {
  transform: translateX(0);
  transition: all 0.5s;
}

#castm-dating #castm-search .move-right {
  transform: translateX(60%);
  transition: all 0.5s;
}

#castm-dating #castm-search .near-by {
  background-color: #cb525b;
  width: 25%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  z-index: 2;
}

#castm-dating #castm-search .near-by span {
  line-height: 30px !important;
  font-size: 14px;
  width: 5px;
}

#castm-dating #castm-search .minutes-8 {
  background-color: #ffe056;
  width: 25%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  z-index: 2;
}

#castm-dating #castm-search .minutes-8 span {
  line-height: 30px !important;
  font-size: 14px;
  width: 5px;
}

#castm-dating #castm-search .menu-item-avatar {
  width: 55px;
  height: 55px;
  margin-right: 5px;
}

#castm-dating #castm-search .menu-item-avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid #ffffff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

#castm-dating #castm-dating #castm-search .div-layout {
  width: 30%;
  height: 100%;
  border-radius: 25%;
}

#castm-dating #castm-search > div span {
  line-height: 40px;
  color: #ffffff;
  width: 15px;
}

/* #castm-dating #castm-search > div:last-child {
  box-shadow: rgba(30, 54, 42, 0.5) -5px 5px 5px;
} */

#castm-dating #castm-contactList {
  box-shadow: rgba(30, 54, 42, 0.5) 5px 5px 20px 0px;
  width: 100%;
}

#castm-dating #castm-contactList .contact-row- {
  line-height: 60px;
  border-bottom: #e9eaec 1px solid;
  display: flex;
  display: -webkit-flex;
  width: 100%;
}

#castm-dating #castm-contactList > .contact-row- > .contact-row-Left {
  padding-left: 15px;
  flex-grow: 4;
}

#castm-dating #castm-contactList > .contact-row- > .contact-row-right {
  width: 20%;
  background: rgba(30, 54, 42, 0.7);
  color: #ffffff;
  text-align: center;
}

/*#castm-dating #castm-contactList > .contact-row- > .contact-row-right > i-icon {
  height: 100%;
  cursor: pointer;
  margin-left: 20%;
} */

i-drawer i-icon {
  display: block;
  color: #ffffff;
  background: #ffffff;
  color: rgba(30, 54, 42, 1);
  text-align: center;
  height: 50px;
  padding-top: 25px;
}

i-drawer i-icon:first-child {
  background: #19be6b;
  color: #ffffff;
}
i-drawer i-icon:last-child {
  background: #ed3f14;
  color: #ffffff;
}
</style>