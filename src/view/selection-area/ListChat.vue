<template>
    <div class="list-chat-wrapper">
        <ul class="list">
            <li v-for="(item, index) in userList" :key="index" @click="() => changeChat(item, index)">
                <div class="list-item" :class="curActiveChatIndex === index ? 'active' : ''">
                    <div class="item-avatar">
                        <el-avatar shape="square" :size="30" :src="item.avatarUrl"></el-avatar >
                    </div>
                    <div class="item-info">
                        <div class="info-desc">
                            <span class="desc-nick">{{lessThenBytes(item.nick, 9)}}</span >
                            <span class="desc-time">{{formatTime(item.msgTime)}}</span >
                        </div>
                        <div class="info-content">
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getAssetsFile, formatTime, lessThenBytes } from '../../utils';
import { getFriendList } from "../../api";
import { key } from '@/store'
import { useStore } from 'vuex';
enum MsgType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'image'
}

interface UserItem {
    username: string
    avatarUrl?:string
    nick: string
    userId: string
    msgType: MsgType
    content: string
    msgTime: number
}

let userList = ref<UserItem[]>([])
const changeChat = (item:UserItem, index:number):void => {
    handleActive(index)
}
let curActiveChatIndex = ref(0)
const store = useStore(key)
const handleActive = (index: number):void => {
    store.commit('setCurrentChatPerson', JSON.parse(JSON.stringify(userList.value[index]))) 
    curActiveChatIndex.value = index
}

const setFriendList = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (!userInfo.userId) return
    const data = await getFriendList({userId: userInfo.userId}).catch(err => {})
    if (data) {
        userList.value = data?.list
        store.commit('setCurrentChatPerson', JSON.parse(JSON.stringify(userList.value[curActiveChatIndex.value])))
    }
}
onMounted(setFriendList)
</script>
<style lang="less" scoped>
.list-chat-wrapper {
    width: 100%;
    height: 100%;
    background-color: #f7f3f3;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        .list-item {
            width: 100%;
            height: 56px;
            display: flex;
            padding: 5px 3px;
            box-sizing: border-box;
            border-radius: 5px;
            &.active {
                background-color: rgba(204,204,204, .4);
            }
            .item-avatar {
                flex: 0 0 40px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .item-info  {
                flex: 1 1 160px;
                padding-left: 5px;
                box-sizing: border-box;
                font-size: 12px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .info-desc {
                    display: flex;
                    justify-content: space-between;
                    .desc-time {
                        font-size: 8px;
                        line-height: 1rem;
                    }
                    .desc-nick {
                        color: #1D1D1D;
                        font-weight: 400;
                    }
                }
                .info-content {
                    color: #ccc;
                }
            }
        }
    }
}
</style>