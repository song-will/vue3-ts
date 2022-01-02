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
    connectedCallback: Function
    disconnectedCallback: Function
    receiveCallback: Function
    constructor({
        domain = defaultDomain,
        path = '',
        token = '',
        connectedCallback = function () { }, // 连接成功回调事件
        disconnectedCallback = function () {}, // 断开连接回调函数
        receiveCallback = function () {} // 接收消息回调函数
    }) {
        this.domain = domain
        this.path = path
        this.token = token
        this.connectedCallback = connectedCallback
        this.disconnectedCallback = disconnectedCallback
        this.receiveCallback = receiveCallback
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
            this.connectedCallback()
        })
        this.socket.on('disconnect', (reason: string) => {
            // 服务器/客户端（disconnect）主动断开，需要手动重连
            if (reason === 'io server disconnect') {
                this.socket?.connect()
            }
            this.disconnectedCallback(reason)
            // 其他情况自动重连 ping timeout/transport close/transport error
        })
    }
    // 发送消息
    sendMessage(msgBody: MsgBody) {
        this.socket?.emit('msg', msgBody)
    }
    // 接收消息
    receiveMessage () {
        this.socket?.on('msg', (msgBody:MsgType) => {
            this.receiveCallback(msgBody)
        })
    }
    // 断开连接
    closeSocket() {
        this.socket?.disconnect()
    }
}