<template>
    <div class="container">
        <div class="area operation-area">
            <operation-area :current-type="currentType" @change-current-type="changeCurrentType" />
        </div>
        <div class="area selection-area">
            <selection-area :current-type="currentType" />
        </div>
        <div class="area content-area">
            <content-area :current-type="currentType" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import OperationArea from '@/view/operation-area/OperationArea.vue'
import SelectionArea from '@/view/selection-area/SelectionArea.vue'
import ContentArea from '@/view/content-area/ContentArea.vue'


const currentType = ref<string>('CHAT')
const changeCurrentType = (type:string):void => {
    currentType.value = type
}

</script>

<style lang="less" scoped>
    .area {
        height: 100%;
    }
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        .operation-area  {
            flex: 0 0 50px;
            background-color: #D6E0E3;
        }
        .selection-area {
            flex: 0 0 240px;
            background: #F7F7F7;
            border-right: 1px solid #ccc;
        }
        .content-area {
            flex: 1 1 1000px;
            background:#F3F3F3;
        }
    }
</style>
