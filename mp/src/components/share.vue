<template>
  <div id="castm-share"
       v-if="isShareFlag"
       @click="cancleShare()">
    <img src="/static/img/share.png">
  </div>
</template>

<script>
export default {
  props: {
    isShareFlag: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    cancleShare() {
      this.$emit('cancleShare')
    }
  }
}
</script>

<style scoped>
#castm-share {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 6;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
}

#castm-share img {
  position: fixed;
  top: -25px;
  right: 5px;
  width: 150px;
  height: 150px;
}
</style>


