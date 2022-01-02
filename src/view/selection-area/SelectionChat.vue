<template>
    <div class="selection-chat-wrapper">
        <div class="search-chat">
            <el-input v-model="searchValue" placeholder="搜索">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="list-chat">
            <list-chat />
        </div>
    </div>
</template>
<script lang="ts" setup>
import ListChat from './ListChat.vue'
import { ref } from 'vue'
import { Search } from "@element-plus/icons-vue";

const searchValue = ref('')

</script>
<style lang="less" scoped>
.selection-chat-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-chat {
        width: 100%;
        flex: 0 0 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 2px;
        box-sizing: border-box;
    }
    .list-chat {
        width: 100%;
        flex: 1 1 500px;
    }
}
</style>