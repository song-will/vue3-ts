// vuex.d.ts
import { Store } from 'vuex'
import SocketManager from '@/utils/socket';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        count: number,
        socketManager: SocketManager | null
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}