import io, { Socket } from 'socket.io-client'

const defaultDomain = 'http://localhost:6060'
enum MsgType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO'
}
interface FileType {
    file: File
    filename: string
}
interface MsgBody {
    sender: string
    receiver: string
    content: string
    type: MsgType
    file?: FileType
}
class SocketManager {
    socket: Socket | null = null
    domain: string
    path: string
    token: string
    constructor({
        domain = defaultDomain,
        path = '',
        token = ''
    }) {
        this.domain = domain
        this.path = path
        this.token = token
        this.initSocket()
    }
    initSocket() {
        this.socket = io(this.domain, {
            transports: ['websocket', 'polling'],
            path: this.path,
            auth: {
                token: this.token
            }
        })
        this.socket.on('connect', () => {
            console.log('connect successfully!')
        })
        this.socket.on('disconnect', (reason: string) => {
            // 服务器/客户端（disconnect）主动断开，需要手动重连
            if (reason === 'io server disconnect') {
                this.socket?.connect()
            }
            // 其他情况自动重连 【ping timeout/transport close/transport error】
        })
    }
    // 发送消息
    sendMessage(msgBody: MsgBody) {
        this.socket?.emit('msg', msgBody)
    }
    /**
     *  绑定事件
     * @param type 事件类型
     * @param fn 事件
     */
    bindEvent (type: string, fn: Function) {
        interface EventMap {
            [key:string]: Function
        }
        const map: EventMap = {
            ['on-receive-message']: () => this.onReceiveMessage(fn), // fn为外界传入的接收消息的回调函数
            ['on-disconnect']: () => this.onDisconnect(fn)
        }
        
        return map[type] && map[type]()
    }
    // 接收消息
    onReceiveMessage (fn: Function) {
        this.socket?.on('msg', (msgBody:MsgType) => {
            fn(msgBody)
        })
    }
    onDisconnect (fn: Function) {
        this.socket?.on('disconnect', (reason:string) => {
            fn(reason)
        })
    }
    // 断开连接
    closeSocket() {
        this.socket?.disconnect()
    }
}

export default SocketManager