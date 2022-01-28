<template>
  <div id="card-video">
    <img
        @mouseover="imgHovered = true"
        @mouseleave="imgHovered = false"
        @click="redirectToWatchPage"
        :src="imgHovered ? video.hoverImage : video.coverImage"
        :alt="video.title"
        class="img-video"
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
  data () {
    return {
      imgHovered: false,
    }
  },
  methods: {
    redirectToWatchPage () {
      this.$router.push({ path: "/watch", query: { id: this.video.id } })
    }
  }
}
</script>

<style scoped>
.img-video {
  width: 350px;
}
</style>