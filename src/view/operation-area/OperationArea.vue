<template>
    <div class="wrapper">
        <div class="operation">
            <div class="operation-item">
                <el-avatar
                    shape="square"
                    :size="32"
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0529%252F32194121j00qtu4et000vc000hs00hsc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643615350&t=5a1aea70973299a3e43902c3d24ad31f"
                ></el-avatar>
            </div>
            <div class="operation-item chat">
                <el-icon
                    :color="iconColorMap.CHAT"
                    size="32"
                    class="on-inherit"
                    @click="() => changeOperation('CHAT')"
                >
                    <chat-round />
                </el-icon>
            </div>
            <div class="operation-item contacts">
                <el-icon
                    :color="iconColorMap.CONTACTS"
                    size="32"
                    class="on-inherit"
                    @click="() => changeOperation('CONTACTS')"
                >
                    <avatar />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ChatRound, Avatar } from "@element-plus/icons-vue"
import { reactive, ref, watch, onMounted } from 'vue'

const props = defineProps({
    currentType: String
})


enum ColorEnum {
    UN_ACTIVE_COLOR = '#bbb',
    ACTIVE_COLOR = '#58BD6A'
}

interface IconColorMap {
    [CHAT: string]: string
    CONTACTS: string
}

interface Friend {
    nick: string
    username: string
    avatarUrl: string
}

const iconColorMap = reactive<IconColorMap>({
    CHAT: ColorEnum.UN_ACTIVE_COLOR,
    CONTACTS: ColorEnum.UN_ACTIVE_COLOR
})
const emit = defineEmits(['change-current-type'])
const changeOperation = (type: string): void => {
    Object.keys(iconColorMap).forEach(item => {
        iconColorMap[item] = ColorEnum.UN_ACTIVE_COLOR
    })
    iconColorMap[type] = ColorEnum.ACTIVE_COLOR
    emit('change-current-type', type)
}
onMounted(() => {
    changeOperation(props.currentType as string)
})




</script>

<style lang="less" scoped>
.wrapper {
    padding: 50px 5px;
    margin: 0 auto;
    .operation {
        .operation-item {
            display: flex;
            justify-content: center;
            margin: 15px 0;
        }
    }
}
</style>
