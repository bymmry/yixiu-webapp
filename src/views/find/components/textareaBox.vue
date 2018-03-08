<template>
  <div class="edit-div"
     v-html="innerText"
     :contenteditable="canEdit"
     @focus="isLocked = true"
     @blur="isLocked = false"
     @input="changeText">
  </div>
</template>

<script>
  //vant

  export default {
    props: {
      value:{
        type: String,
        default: ''
      },
      canEdit: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        innerText: this.value,
        isLocked: false
      }
    },
    components: {
      
    },
    watch: {
      'value'(){
        if (!this.isLocked || !this.innerText) {
          this.innerText = this.value;
        }
      }
    },
    methods: {
      changeText(){
        this.$emit('input', this.$el.innerHTML);
      }
    }
  }
</script>

<style scoped>
  .edit-div >>> img{
    max-width: 100%;
    max-height: 120px; 
  }
  .edit-div {
    width: 100%;
    height: 100%;
    min-height: 60vh;
    font-size: 14px;
    margin-top: 17px;
    line-height: 16px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    background: transparent;
    z-index: 10;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
</style>