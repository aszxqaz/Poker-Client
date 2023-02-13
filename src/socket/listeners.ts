import { useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useTabsContext, useUserContext } from '../contexts'
import { useSocketContext } from '../contexts/SocketContext'
import { useTablesContext } from '../contexts/Tables/TablesContext'
import { GameplayTable, TourneyResult } from '../types'
import {
  ActiveMessages,
  CashMessages,
  SngJoinPayload,
  SngMessages,
  TourneyMessages,
  UserMessages,
} from './messages'
import { ActiveTablesConnection } from './socketConnection'

export const useSocketListeners = (listenersObj: Parameters<ActiveTablesConnection['addListeners']>[0]) => {
  const socket = useSocketContext()

  useEffect(() => {
    socket.addListeners(listenersObj)

    return () => {
      socket.removeListeners(listenersObj)
    }
  }, [])
}

export const useCashSocketListeners = () => {
  const { setCashTables, addCashTable } = useTablesContext()

  useSocketListeners({
    [CashMessages.ALL]: tables => {
      console.debug(`Message <${CashMessages.ALL}> received`)
      setCashTables(tables)
    },
    [CashMessages.ONE]: table => {
      console.debug(`Message <${CashMessages.ONE}> received`)
      addCashTable(table)
    },
  })
}

export const useSngSocketListener = () => {
  const { setTourneys, addTourney } = useTablesContext()

  useSocketListeners({
    [SngMessages.ALL]: tourneys => {
      console.debug(`Message <${SngMessages.ALL}> received`)
      setTourneys(tourneys)
    },
    [SngMessages.ONE]: tourney => {
      console.debug(`Message <${SngMessages.ONE}> received`)
      addTourney(tourney)
    },
  })
}

export const useUserSocketListener = () => {
  const { setBalance } = useUserContext()

  useSocketListeners({
    [UserMessages.BALANCE]: balance => {
      console.debug(`Message <${UserMessages.BALANCE}> received`)
      setBalance(balance)
    },
  })
}

export const useActiveSocketListener = () => {
  const { addActiveTable, setActiveTables, activeTables, removeActiveTable } = useTablesContext()
  const { addTables, removeTable, setTabIndexByTableId } = useTabsContext()

  useSocketListeners({
    [ActiveMessages.ALL]: (tables: GameplayTable[]) => {
      console.debug(`Message <${ActiveMessages.ALL}> received`)
      setActiveTables(tables)
      addTables(...tables.map(_ => _.id))
    },
    [ActiveMessages.ONE]: (table: GameplayTable) => {
      console.debug(`Message <${ActiveMessages.ONE}> received`)
      addActiveTable(table)
      addTables(table.id)
      if (table.round.isHeroTurn) {
        setTabIndexByTableId(table.id)
      }
    },
    [CashMessages.LEAVE]: (tableId: number) => {
      console.debug(`Message <${CashMessages.LEAVE}> received (tableId: ${tableId})`)
      removeActiveTable(tableId)
      removeTable(tableId)
    },
  })

  return { activeTables, removeActiveTable }
}

export const useTourneyResultsListener = () => {
  const { addResult, results, removeResult } = useTablesContext()

  useSocketListeners({
    [TourneyMessages.FINISH]: (result: TourneyResult) => {
      console.debug(`Message <${TourneyMessages.FINISH}> received`)
      addResult(result)
    },
  })

  return { results, removeResult }
}

export const useSngInfoListener = (tourneyId?: number) => {
  const { tourneys, addTourney } = useTablesContext()
  const socket = useSocketContext()

  useEffect(() => {
    if (!tourneyId) return
    socket.emit(SngMessages.ONE, {
      method: 'SUBSCRIBE',
      tourneyId,
    })
    return () => {
      socket.emit(SngMessages.ONE, {
        method: 'UNSUBSCRIBE',
        tourneyId,
      })
    }
  }, [tourneyId])

  useSocketListeners({
    [SngMessages.ONE]: tourney => {
      addTourney(tourney)
    },
  })

  return { tourneys }
}

export const useSocketConnectionListener = () => {
  const toast = useToast()
  const socket = useSocketContext()

  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    isConnected
      ? toast({
          title: 'Connected.',
          description: 'Connection established.',
          status: 'success',
          isClosable: false,
          duration: 1000,
        })
      : toast({
          title: 'Reconnecting...',
          description: 'Connection lost.',
          status: 'error',
          isClosable: false,
          duration: 1000,
        })
  }, [isConnected])

  useSocketListeners({
    disconnect: () => {
      console.debug(`Message <close> received`)
      setIsConnected(false)
    },
    connect: (result: TourneyResult) => {
      console.debug(`Message <close> received`)
      setIsConnected(true)
    },
  })
}
