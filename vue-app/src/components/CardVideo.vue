<template>
  <div id="card-video">
    <img :src="video.coverImage" :alt="video.title">
    <h3 id="title">{{ video.title }}</h3>
  </div>
</template>

<script>
export default {
  name: "CardVideo",
  props: {
    video: Object
  }
}
</script>

<style scoped>

</style>