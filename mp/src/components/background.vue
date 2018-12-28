<template>
  <i-spin size="large"
          v-if="isLoadingFlag"
          fix></i-spin>
</template>

<script>
export default {
  props: ["isLoadingFlag"],
  data() {

  }
}
</script>

<style scoped>
</style>

