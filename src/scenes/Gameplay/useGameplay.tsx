import { useSocketContext } from '../../contexts'
import { CashMessages, TableActionPayload, TableMessages } from '../../socket/messages'

export const useGameplay = () => {
  const socket = useSocketContext()

  const leaveCashTable = (tableId: number) => {
    socket.emit(CashMessages.LEAVE, tableId)
  }

  const takeAction = (tableId: number, value: number) => {
    socket.emit(TableMessages.ACTION, {
      tableId,
      value
    })
  }

  return { leaveCashTable, takeAction }
}
