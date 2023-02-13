import { useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { useCashSocketEmitters } from '../../socket/emitters'

export const useCashLobby = () => {
  const { cashTables: tables, joinTable } = useCashSocketEmitters()
  const { user, balance } = useUserContext()

  const [selectedTableId, setSelectedTableId] = useState<number | null>(null)
  const [clickedTableId, setClickedTableId] = useState<number | null>(null)

  const clickedTable = tables.find(game => game.id === clickedTableId)
  const selectedTable = tables.find(game => game.id === selectedTableId)
  const isJoined = !!clickedTable?.players.find(player => player.username === user?.username || '')

  return {
    tables,
    user,
    balance,
    selectedTableId,
    setSelectedTableId,
    clickedTableId,
    setClickedTableId,
    clickedTable,
    selectedTable,
    isJoined,
    joinTable,
  }
}
