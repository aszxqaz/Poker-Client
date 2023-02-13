import { Box, Portal, Toast, useToast } from '@chakra-ui/react'
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'
import { BaseSocketConnection, SocketConnection } from '../socket/socketConnection'
import { ImConnection } from 'react-icons/im'

export const socket = new SocketConnection()

const SocketContext = createContext<BaseSocketConnection>(socket)

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const fakeRef = useRef(false)

  useEffect(() => {
    if (!fakeRef.current || !socket.isConnected) {
      socket.connect()
    }

    return () => {
      socket.close()
    }
  }, [])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
