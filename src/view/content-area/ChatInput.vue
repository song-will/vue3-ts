<template>
    <div class="chat-input-wrapper">
        <div class="input-operation">
            <input-operation />
        </div>
        <div class="input-content">
            <input-content />
        </div>
    </div>
</template>
<script lang="ts" setup>
import InputOperation from './InputOperation.vue'
import InputContent from './InputContent.vue'
</script>
<style lang="less" scoped>
.chat-input-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .input-operation {
        flex: 0 0 40px;
        border-bottom:1px solid #ddd;
    }
    .input-content {
        flex: 1 1 auto;
    }
}
</style>