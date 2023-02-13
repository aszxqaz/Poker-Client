import { useEffect, useRef } from 'react'
import { useTablesContext, useSocketContext } from '../contexts'
import { CashMessages, SngJoinPayload, SngMessages } from './messages'

export const useCashSocketEmitters = () => {
  const { cashTables } = useTablesContext()
  const socket = useSocketContext()

  useEffect(() => {
    if (!cashTables.length) {
      console.debug(`Message <${CashMessages.ALL}> emitted`)
      socket.emit(CashMessages.ALL)
    }
  }, [cashTables])

  const joinTable = (tableId: number, buyin: number) => {
    socket.emit(CashMessages.JOIN, {
      tableId,
      buyin,
    })
  }

  return { cashTables, joinTable }
}

export const useSngSocketEmitters = () => {
  const { tourneys } = useTablesContext()
  const socket = useSocketContext()
  const isFetched = useRef(false)

  useEffect(() => {
    if (!isFetched.current) {
      console.debug(`Message <${SngMessages.ALL}> emitted`)
      socket.emit(SngMessages.ALL)
      isFetched.current = true
    }
  }, [tourneys])

  const join = (tourneyId: number) => {
    socket.emit(SngMessages.JOIN, new SngJoinPayload(tourneyId))
  }

  const unjoin = (tourneyId: number) => {
    socket.emit(SngMessages.UNJOIN, new SngJoinPayload(tourneyId))
  }

  return { tourneys, join, unjoin }
}

export const usePlayAgainSngSocketEmitter = () => {
  const socket = useSocketContext()

  const playAgain = (tourneyId: number) => {
    socket.emit(SngMessages.PLAY_AGAIN, new SngJoinPayload(tourneyId))
  }

  return { playAgain }
}
