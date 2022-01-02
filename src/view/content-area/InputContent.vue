<template>
    <div class="input-content-wrapper">
        <el-input @paste="onPaste" ref="refInput" v-model="inputValue" type="textarea"></el-input  >
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const inputValue = ref('')
const refInput = ref(null as HTMLElement | null)

const onPaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    let file: File | null = null
    if  (items && items.length) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1){
                file = items[i].getAsFile()
                break
            }
        }
    }
    if (!file) {
        console.log('不是图片')
        return
    }
    let e = {
        target: {
            files: [file],
            filename:file.name
        }
    }
    console.log('e',e)
    uploadFile()
}
const uploadFile = () => {

}

</script>
<style lang="less" scoped>
.input-content-wrapper {
    width: 100%;
    height: 100%;
    :deep(.el-textarea.el-input--default) {
        height: 100%;

        .el-textarea__inner {
            height: 100%;
            resize: none;
            border: 0;
            background: transparent;
        }
    }
}
</style>