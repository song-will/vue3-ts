<template>
    <div class="content-chat-wrapper">
       <div class="chat-header">
           <div class="header-name">
               <span>明日之星</span>
           </div>
           <div class="header-operation"></div>
       </div> 
       <div class="chat-content"></div>
       <div class="chat-input">
           <chat-input />
       </div>
    </div>
</template>
<script lang="ts" setup>
import ChatInput from './ChatInput.vue'
</script>
<style lang="less" scoped>
.content-chat-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .chat-header {
        flex: 0 0 60px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .chat-content {
        flex: 1 1 auto;
    }
    .chat-input {
        flex: 0 0 160px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
    }
}
</style>