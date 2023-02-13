import { GameplayTable } from '../../scenes/Gameplay/gameplay.types'

export const getRoundData = (table: GameplayTable, username?: string) => {

  const _players = table.round.players

  const heroIndex = _players.findIndex(player => player.username === username)
  const players = _players.slice(heroIndex).concat(_players.slice(0, heroIndex))

  return { ...table.round, players }

}
