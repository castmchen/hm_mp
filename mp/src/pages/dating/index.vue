<template>
  <div id="castm-dating">
    <div id="castm-operate">
      <i-icon type="browse_fill"
              size="50"
              color="rgba(30, 54, 42, 1)"
              @click="navigateToSearch('../search/main')" />
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
    <background :isLoadingFlag="isLoadingFlag"></background>
    <share :isShareFlag="isShareFlag"
           @cancleShare="listenCanleShare()"></share>
  </div>
</template>

<script>
import background from '../../components/background'
import { datingService } from '../../service/datingService'
import share from '../../components/share'

export default {
  data() {
    return {
      contactList: [],
      selectedContact: null,
      isLoadingFlag: false,
      isShareFlag: false
    }
  },
  created() {
    this.getContactListByUserId().then((contactList) => {
      this.contactList = contactList
    })
  },
  onHide() {
    this.isLoadingFlag = false
  },
  onLoad() {
    this.isShareFlag = false
  },
  methods: {
    async getContactListByUserId(userId) {
      let result = await datingService.getContactList(userId)
      return result
    },
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
    listenCanleShare() {
      this.isShareFlag = false
    }
  },
  components: {
    background,
    share
  }
}
</script>

<style scoped>
#castm-dating {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  background: #ffffff;
  position: absolute;
  width: 100%;
  min-height: 100%;
  color: #80848f;
}
#castm-dating #castm-operate {
  /* width: 40px;
  margin-left: calc(50% - 15px);
  margin-top: 15px;
  border: #ffc95c 1rpx solid;
  border-radius: 30%;
  box-shadow: #ffc95c 0px 0px 30px 10px; */
  text-align: center;
}

#castm-dating #castm-contactList {
  position: relative;
  display: block;
  box-shadow: darkgray 0px 0px 30px 0px;
  margin-top: 15px;
}

#castm-dating #castm-contactList .contact-row- {
  line-height: 60px;
  border-bottom: #e9eaec 1px solid;
}

#castm-dating #castm-contactList > .contact-row- > .contact-row-Left {
  display: inline-block;
  margin-left: 10px;
  width: 70%;
}

#castm-dating #castm-contactList > .contact-row- > .contact-row-right {
  display: inline-block;
  height: 100%;
  width: 27%;
  background: rgba(30, 54, 42, 0.8);
  color: #ffffff;
}

#castm-dating #castm-contactList > .contact-row- > .contact-row-right > i-icon {
  height: 100%;
  cursor: pointer;
  margin-left: 20%;
}

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