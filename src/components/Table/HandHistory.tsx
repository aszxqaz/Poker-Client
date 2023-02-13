import { GameplayTable } from "../../scenes/Gameplay/gameplay.types"
import { Round } from "../../types/round"

export const saveHandHistory = (table: GameplayTable) => {
  if(table.round.state !== 'PLAYING') return
  const item = sessionStorage.getItem(table.id.toString())
  
  let history: Omit<GameplayTable, 'round'> & {rounds : Round[]}
  if (item) {
    history = JSON.parse(item)
    history.rounds.push(table.round)
  } else {
    const { round, ...tableWithoutRound } = table
    history = Object.assign({}, {...tableWithoutRound, rounds: []})
    history.rounds.push(table.round)
  }
  sessionStorage.setItem(table.id.toString(), JSON.stringify(history))
}