import { createStore, Store } from 'vuex'
import SocketManager from '../utils/socket';
import { InjectionKey } from 'vue'

export interface State {
    count: number,
    socketManager: SocketManager | null,
    currentChatPerson: Friend | null,
    userInfo: UserInfo | null
}

enum MsgType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'image'
}
interface Friend {
    username: string
    avatarUrl?: string
    nick: string
    userId: string
    msgType: MsgType
    content: string
    msgTime: number
    uuid: string
}
interface UserInfo {
    username: string
    uuid: string
    userId: string
}
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        count: 0,
        socketManager: null,
        currentChatPerson: null,
        userInfo: null
    },
    mutations: {
        increment (state) {
            state.count ++
        },
        initSocket (state, payload) {
            state.socketManager = new SocketManager({
                domain: 'http://localhost:6060',
                path: '/im',
                ...payload
            })
        },
        setCurrentChatPerson (state, payload: Friend) {
            if (!payload || !payload.uuid) return 
            state.currentChatPerson = {...payload}
        },
        setUserInfo (state, payload: UserInfo) {
            state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        }
    }
})