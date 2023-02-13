import { Round } from '../../types/round'

export type GameplayTable = {
  id: number
  type: 'CASH' | 'TOURNEY'
  state: 'PAUSED' | 'PENDING' | 'ACTIVE'

  players: {
    username: string
    avatar: string
    chips: number
  }[]

  round: Round
}
