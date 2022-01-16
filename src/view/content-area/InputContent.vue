<template>
    <div class="input-content-wrapper">
        <el-input
            @paste="onPaste"
            ref="refInput"
            v-model="msgBody.content"
            type="textarea"
            @keydown.enter="handleEnter"
        ></el-input>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { key } from '@/store'
import { useStore } from 'vuex';

interface MsgBody {
    content: string
    senderUuid: string
    receiverUuid: string
    msgType: string
}

const msgBody = reactive<MsgBody>({
    content: '',
    senderUuid: '',
    receiverUuid: '',
    msgType: 'text'
})
const refInput = ref(null as HTMLElement | null)

const onPaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    let file: File | null = null
    if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
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
            filename: file.name
        }
    }
    console.log('e', e)
    uploadFile()
}
/**
 * 上传文件
 */
const uploadFile = () => {

}
const store = useStore(key)
/**
 * 处理回车事件
 */
const handleEnter = (event: KeyboardEvent): void => {
    // 当处于中文输入法面板有值时，不触发发送
    if (event.keyCode === 229) {
        return
    }
    if (!msgBody.content) return
    msgBody.senderUuid = store.state?.userInfo?.uuid
    msgBody.receiverUuid = store.state?.currentChatPerson?.uuid
    // 取消回车换行
    event.preventDefault()
    store?.state?.socketManager?.sendMessage(msgBody)
    msgBody.content = ''
}
const init = () => {
    store?.state?.socketManager?.bindEvent('on-receive-message', function(msg: string) {
        console.log('msg', msg)
    })
}
onMounted(init)

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
            font-size: 12px;
            color: #333;
        }
    }
}
</style>