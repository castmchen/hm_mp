<template>
  <div id="castm-match">
    <i-steps :current="currentStep">
      <i-step>
        <view slot="title">
          <i-avatar :src="contactInfo.avatar"
                    size="small"></i-avatar>
          开始
        </view>
      </i-step>
      <i-step>
        <view slot="title">
          进行中
        </view>
      </i-step>
      <i-step>
        <view slot="title">
          已完成
        </view>
      </i-step>
    </i-steps>
    <div v-if="currentStep == 0">
      <i-panel title="颜值">
        <i-cell-group>
          <i-cell title="请摸着良心把自己的颜值转化成小星星">
            <i-rate count="10"
                    @change="onChangeStar($event)"
                    :value="starIndex"
                    size="28">
              {{starIndex}}星
            </i-rate>
          </i-cell>
        </i-cell-group>
      </i-panel>
      <i-panel title="性格">
        <i-tag v-for="(natureInfo, index) in natureList"
               :key="index"
               @change="onChangeTag($event)"
               checkable="true"
               :name="natureInfo.id"
               :color="natureInfo.color"
               :checked="natureInfo.checked"
               type="border"
               style="margin-right:10px">
          {{natureInfo.description}}
        </i-tag>
      </i-panel>
      <i-panel title="收入">
        <i-radio-group :current="currentSalary"
                       @change="onChangeRadioBySalary($event)">
          <i-radio v-for="salaryItem in salaryList"
                   :key="salaryItem.id"
                   position="left"
                   :value="salaryItem.amount"
                   color="green">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="感情 (对待初恋的态度) ">
        <i-radio-group :current="currentMind"
                       @change="onChangeRadioByMind($event)">
          <i-radio v-for="mindItem in mindList"
                   :key="mindItem.id"
                   position="left"
                   :value="mindItem.sense"
                   color="pink">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="生活态度">
        <i-checkbox-group :current="currentLife"
                          @change="onChangeCheckbox($event)">
          <i-checkbox v-for="lifeItem in lifeList"
                      :key="lifeItem.id"
                      position="left"
                      :value="lifeItem.sense"
                      color="purple">
          </i-checkbox>
        </i-checkbox-group>
      </i-panel>
      <i-button @click="submitReord(caculateProgress)"
                type="success"
                long="true">开始测验</i-button>
    </div>
    <div v-if="currentStep == 1">
      <i-progress :percent="progressPercent"
                  :status="progressStatus"
                  hide-info
                  stroke-width=20></i-progress>
    </div>
    <div v-if="currentStep == 2"
         class="page-3">
      <span class="page-grade">{{matchedGrade}}</span>
      <i-button @click="submitReord()"
                type="success"
                long="true"
                class="page-bottom">重新测验</i-button>
    </div>
  </div>
</template>

<script>
import { matchService } from '../../service/matchService'

export default {
  data() {
    return {
      contactInfo: {},
      starIndex: 1,
      natureList: [],
      salaryList: [],
      currentSalary: "",
      mindList: [],
      currentMind: "",
      lifeList: [],
      currentLife: [],
      currentStep: 0,
      matchedGrade: null,
      progressPercent: 0,
      progressStatus: 'wrong'
    }
  },
  onLoad(options) {
    Promise.all([this.getNatureList(), this.getSalaryList(), this.getMindList(), this.getLifeList()]).then((p) => {
      this.initData(p)
    })
    this.contactInfo = JSON.parse(options.contact)
  },
  methods: {
    //#region methods for service
    async getNatureList() {
      let result = await matchService.getNatureData()
      return result
    },
    async getSalaryList() {
      let result = await matchService.getSalaryData()
      return result
    },
    async getMindList() {
      let result = await matchService.getMindData()
      return result
    },
    async getLifeList() {
      let result = await matchService.getLifeData()
      return result
    },
    //#endregion
    //#region methods for dom
    onChangeStar(e) {
      this.starIndex = e.mp.detail.index
    },
    onChangeTag(e) {
      let selectedTag = null
      this.natureList.forEach(p => {
        if (p.id == e.mp.detail.name) {
          selectedTag = p
        }
      })
      selectedTag.checked = e.mp.detail.checked
    },
    onChangeRadioBySalary(e) {
      this.currentSalary = e.mp.detail.value
    },
    onChangeRadioByMind(e) {
      this.currentMind = e.mp.detail.value
    },
    onChangeCheckbox(e) {
      let index = this.currentLife.indexOf(e.mp.detail.value)
      index == -1 ? this.currentLife.push(e.mp.detail.value) : this.currentLife.splice(index, 1)
    },
    submitReord(caculateProgress) {
      if (this.matchedGrade != null & this.currentStep === 2) {
        this.matchedGrade = null
      }
      this.currentStep = this.currentStep + 1 > 2 ? 0 : this.currentStep + 1
      if (caculateProgress != null || typeof caculateProgress != 'undefined') {
        caculateProgress()
      }
    },
    caculateProgress() {
      let promise = new Promise((resolve, reject) => {
        if (this.progressPercent < 100) {
          this.progressPercent += 5
          if (this.progressPercent <= 10) {
            this.progressStatus = 'wrong'
          } else if (this.progressPercent <= 95) {
            this.progressStatus = 'active'
          } else if (this.progressPercent <= 100) {
            this.progressStatus = 'success'
          }
        }
        setTimeout(resolve, 200)
      })
      if (this.progressPercent < 100) {
        promise.then(this.caculateProgress)
      } else {
        promise.then(() => {
          this.progressPercent = 0
          this.progressStatus = 'wrong'
          this.matchedGrade = this.caculateGrade()
          this.submitReord()
        })
      }
    },
    caculateGrade() {
      return Math.floor(Math.random() * 40 + 61)
    },
    //#endregion
    //#region methods for callback
    initData(dataArray) {
      [this.natureList, this.salaryList, this.mindList, this.lifeList] = dataArray
      this.currentSalary = this.salaryList[0].amount
      this.currentMind = this.mindList[0].sense
      this.currentLife = [this.lifeList[0].sense, this.lifeList[1].sense]
    }
    //#endregion
  }
}
</script>

<style scoped>
#castm-match {
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
.background-steps {
  background: #ffffff;
}
#castm-match i-avatar {
  position: absolute;
  top: 0;
  z-index: 3;
}
#castm-match .page-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
#castm-match .page-3 {
  height: 100%;
  width: 100%;
  background: #1c2438;
}
#castm-match .page-grade {
  position: fixed;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  color: #ffffff;
  font-size: 200px;
}
</style>
