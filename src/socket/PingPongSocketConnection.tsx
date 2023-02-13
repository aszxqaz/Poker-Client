import { Flex, Portal } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaCircle } from 'react-icons/fa'
import { useSocketContext } from '../contexts/SocketContext'
import { useSocketListeners } from './listeners'

export const PingPongSocketConnection = () => {
  const socket = useSocketContext()
  const [isConnected, setIsConnected] = useState(true)
  const connectRef = useRef({
    connectInterval: 0,
    connectTimeout: 0,
    pingTimestamp: 0,
  })

  useEffect(() => {

  }, [socket.isConnected])

  useSocketListeners({
    connect_error: () => {
      setIsConnected(false)
    },
    disconnect: () => {
      setIsConnected(false)
    },
    connect: () => {
      setIsConnected(true)
    },
    
  })

  useEffect(() => {
    clearInterval(connectRef.current.connectInterval)
  }, [])

  return (
    <Portal>
      {/* {!isConnected ? ( */}
      <Flex
        pos="fixed"
        borderRadius="md"
        top="0"
        right="0"
        py="2vh"
        px="2.3vh"
        mr="2vh"
        mt="2vh"
        bgColor="blackAlpha.100"
        color={isConnected ? 'green.200' : 'red.500'}
        alignItems="center"
        gap="0.7rem"
        userSelect="none"
      >
        <FaCircle fontSize="0.6rem" />
        {socket.isConnected ? 'Connected' : 'Reconnecting...'}<br/>
      </Flex>
      {/* ) : null} */}
    </Portal>
  )
}
