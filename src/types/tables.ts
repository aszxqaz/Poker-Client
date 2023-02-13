import { Speed, TourneyState, TourneyType } from "./misc"
import { Round } from "./round"

export type GameplayTable = {
  id: number
  tourneyId?: number

  tableSize: number
  state: "PAUSED" | "PENDING" | "ACTIVE"
  type: "CASH" | "TOURNEY"
  name: string

  players: {
    username: string
    avatar: string
    chips: number
  }[]

  round: Round
}

export type CashTable = {
  id: number
  name: string
  stack: number
  bb: number
  tableSize: number
  playersCount: number
  state: 'ACTIVE' | 'PENDING' | 'PAUSED'

  players: {
    username: string
    // avatar: string
    // chips: number
  }[]

  round: Round
}

export type Player = {
  username: string
}

export interface Tourney {
  id: number
  type: TourneyType
  state: TourneyState
  name: string
  buyin: number
  chips: number
  tableSize: number
  speed: Speed
  entries: string[]
  placings: {
    username: string
    place: number
    amount: number
  }[]
  prizes: number[]
  startedAt?: number
  tables: {
    id: number
    players: {
      username: string
      chips: number
    }[]
  }[]
}

export type TourneyResult = {
  tourney: Tourney
  place: number
  amount?: number
  entries: number
}