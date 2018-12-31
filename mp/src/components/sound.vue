<template>
  <div id="castm-sound"
       @click="soundPlay()">
    <div v-if="position == 'right'"
         id="castm-sound-left">
      <image v-if="index == 1"
             src="../../static/img/play_1.png" />
      <image v-if="index == 2"
             src="../../static/img/play_2.png" />
      <image v-if="index == 3"
             src="../../static/img/play_3.png" />
    </div>
    <div v-if="position == 'left'"
         id="castm-sound-right">
      <image v-if="index == 1"
             src="../../static/img/play_1.png" />
      <image v-if="index == 2"
             src="../../static/img/play_2.png" />
      <image v-if="index == 3"
             src="../../static/img/play_3.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      require: true,
      default: 'right'
    }
  },
  name: 'sound',
  data() {
    return {
      index: 3,
      timer: null
    }
  },
  onReady() {
  },
  onLoad() {

  },
  methods: {
    soundPlay(timer) {
      if (this.timer == null) {
        this.createAnimationByTimer()
      } else {
        clearInterval(this.timer)
        this.index = 3
        this.timer = null
      }
    },
    createAnimationByTimer() {
      this.timer = setInterval(() => {
        let i = this.index + 1
        i = i > 3 ? 1 : i
        this.index = i
      }, 500)
    }
  }
}
</script>

<style scoped>
#castm-sound #castm-sound-right {
  transform: rotate(180deg);
}

#castm-sound image {
  width: 15px;
  height: 15px;
}
</style>


