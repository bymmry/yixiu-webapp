import VueImgLoader from 'vue-img-loader'
VueImgLoader.config.blurPreview = true;
// VueImgLoader.config.blurRadius = 20;
VueImgLoader.config.blurAlphaChannel = false;
// VueImgLoader.config.width = 161.8;
// VueImgLoader.config.height = 100;
VueImgLoader.config.backgroundColor = '#f3f4f5'
VueImgLoader.config.transition = ''
VueImgLoader.config.centerType = 'cover' // "cover", "contain"

export default {
  install(Vue) {
    Vue.component('vImg', VueImgLoader)
  }
}