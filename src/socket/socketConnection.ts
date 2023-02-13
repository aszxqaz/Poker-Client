import { Socket, io, ManagerOptions, SocketOptions } from 'socket.io-client'
import { objectKeys } from '../utils/objectKeys'

export class BaseSocketConnection {
  protected socket: Socket | undefined = undefined
  protected listeners: Set<Function> = new Set()

  constructor(url: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    if (!this.socket) {
      this.socket = io(url, {
        autoConnect: false,
        withCredentials: true,
        timeout: 1000,
        reconnectionDelay: 500,
        reconnectionDelayMax: 2000,
        // requestTimeout: 100,
        ...opts,
      })
    }
  }

  public on(...args: Parameters<Socket['on']>) {
    this.socket?.on(...args)
  }

  public emit(msg: string, data?: any) {
    this.socket?.emit(msg, data)
  }

  public close() {
    this.socket!.disconnect()
  }

  public connect() {
    this.socket!.connect()
    this.socket?.on('disconnect', () => {
    })
    this.socket?.on('connect_error', () => {
    })
  }

  get isConnected() {
    return this.socket!.connected
  }

  public addListeners(listeners?: Record<string, (...args: any[]) => void>) {
    if (!listeners) return

    objectKeys(listeners).forEach(eventName => {
      this.listeners.add(listeners[eventName])
      this.socket!.on(eventName, listeners[eventName])
    })
    return this
  }

  public removeListeners(listeners?: Record<string, (...args: any[]) => void>) {
    if (!listeners) return

    objectKeys(listeners).forEach(eventName => {
      this.listeners.delete(listeners[eventName])
      this.socket!.removeListener(eventName, listeners[eventName])
    })
    return this
  }
}

export class CashSocketConnection extends BaseSocketConnection {
  constructor(opts?: Partial<ManagerOptions & SocketOptions>) {
    const { VITE_SOCKET_API_PROD, VITE_SOCKET_API_DEV, PROD, VITE_SOCKET_CASH_ENDPOINT } = import.meta.env
    const BASE_URL = PROD ? VITE_SOCKET_API_PROD : VITE_SOCKET_API_DEV
    const endpoint = VITE_SOCKET_CASH_ENDPOINT
    super(`${BASE_URL}`, opts)
  }

  public joinTable(tableId: string) {
    // this.socket!.emit(CashMessages.JOIN_TABLE, tableId)
  }
}

export class ActiveTablesConnection extends BaseSocketConnection {
  constructor(opts?: Partial<ManagerOptions & SocketOptions>) {
    const { VITE_SOCKET_API_PROD, VITE_SOCKET_API_DEV, PROD, VITE_SOCKET_ACTIVE_TABLES_ENDPOINT } =
      import.meta.env
    const BASE_URL = PROD ? VITE_SOCKET_API_PROD : VITE_SOCKET_API_DEV
    const endpoint = VITE_SOCKET_ACTIVE_TABLES_ENDPOINT
    super(`${BASE_URL}`, opts)
  }
}

export class SocketConnection extends BaseSocketConnection {
  constructor(opts?: Partial<ManagerOptions & SocketOptions>) {
    const { VITE_SOCKET_API_PROD, VITE_SOCKET_API_DEV, PROD } = import.meta.env
    const BASE_URL = PROD ? VITE_SOCKET_API_PROD : VITE_SOCKET_API_DEV
    super(`${BASE_URL}`, opts)
  }
}
