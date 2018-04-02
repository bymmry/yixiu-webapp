<template>
  <div class="videos">
      <videoItem
        v-for="(item, index) in data"
        :key="index"
        :videoSrc='item.src'
        :name='item.name'
      ></videoItem>
  </div>
</template>

<script>
    import videoItem from './videoItem.vue'
    export default {
        name: 'videos',
        components: {
            videoItem
        },
        data(){
            return {
                data: [
                    {
                        src: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/test.mp4',
                        name: '培训视频1'
                    },
                    {
                        src: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/test.mp4',
                        name: '培训视频2'
                    }
                ]
            }
        }
    }
</script>

<style>
.videos{
    width: 100%;
    height: 84vh;
}
</style>
