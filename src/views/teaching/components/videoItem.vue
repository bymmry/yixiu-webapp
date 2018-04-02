<template>
  <div class="videoItem">
      <h3>{{name}}</h3>
      <div class="video">
          <video :src="videoSrc" controls="controls"></video>
      </div>
  </div>
</template>

<script>
    export default {
        name: 'video-item',
        props: {
            videoSrc: String,
            name: String
        }
    }
</script>

<style>
.videoItem{
    width: 100%;
    padding: 10px 0;
    border-top: 8px solid #eee;
}
.videoItem .video{
    width: 100%;
    height: auto;
}
.videoItem .video video{
    padding: 5px 5%;
    width: 90%;
    height: auto;
}
</style>
