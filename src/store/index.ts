import { createStore, Store } from 'vuex'
import SocketManager from '../utils/socket';
import { InjectionKey } from 'vue'

export interface State {
    count: number,
    socketManager: SocketManager | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        count: 0,
        socketManager: null
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
        }
    }
})