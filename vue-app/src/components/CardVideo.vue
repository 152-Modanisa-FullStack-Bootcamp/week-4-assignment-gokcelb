<template>
  <div id="card-video">
    <img
        @click="redirectToWatchPage"
        :src="video.coverImage"
        :alt="video.title"
    >
    <h3 id="title">{{ video.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "CardVideo",
  props: {
    video: Object
  },
  methods: {
    redirectToWatchPage () {
      this.$router.push({ path: "/watch", query: { id: this.video.id } })
    }
  }
}
</script>

<style scoped>

</style>