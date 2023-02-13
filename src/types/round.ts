
export type Round = {
  TURN_TIMEOUT: number
  state: 'PENDING' | 'PLAYING'
  hand: number
  timestamp: number
  bb: number
  pot: number
  players: RoundPlayer[]
  board: (number[] | null)[]
  sbIndex: number
  bbIndex: number
  buttonIndex: number
  turnIndex: number
  winners: RoundWinner[]
  minbet: number
  toCall: number
  allinShowdown: boolean
  done: boolean
  prev: PrevAction | null
  showdown: Showdown

  cards: number[][]
  isHeroTurn: boolean
  isLast: boolean
  isWaitingForBB: boolean
  isSitOut: boolean
}

export type Showdown = {
  username: string
  cards: number[][]
}[]

export type RoundPlayer = {
  username: string
  chips: number
  bet: number
  isDone: boolean
  isOut: boolean
  isSitOut: boolean
  isTurn: boolean
  limit: number
}

export type RoundWinner = {
  username: string
  cards?: number[][]
  amount: number
  isHighlighted: boolean
}

export type PrevAction = {
  username: string
  type: 'CHECK' | 'CALL' | 'BET' | 'RAISE' | 'FOLD' | 'ALL IN'
}
