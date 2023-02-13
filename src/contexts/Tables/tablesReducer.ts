import { useReducer } from 'react'
import { produce } from 'immer'
import { CashTable, GameplayTable, Tourney } from '../../types'

type TablesState = {
  cashTables: CashTable[]
  tourneys: Tourney[]
  activeTables: GameplayTable[]
}

export enum TablesActionKind {
  CASH_ALL,
  TOURNEYS_ALL,
  CASH_ONE,
  TOURNEYS_ONE,
  ACTIVE_ALL,
  ACTIVE_ONE,
  ACTIVE_REMOVE,
  OPTIMISTIC_FOLD,
  OPTIMISTIC_CHECK_OR_CALL,
  OPTIMISTIC_BET,
  TIMEOUT_LEFT,
}

type TablesAction =
  | {
      type: TablesActionKind.CASH_ALL
      payload: CashTable[]
    }
  | {
      type: TablesActionKind.TOURNEYS_ALL
      payload: Tourney[]
    }
  | {
      type: TablesActionKind.CASH_ONE
      payload: CashTable
    }
  | {
      type: TablesActionKind.TOURNEYS_ONE
      payload: Tourney
    }
  | {
      type: TablesActionKind.ACTIVE_ALL
      payload: GameplayTable[]
    }
  | {
      type: TablesActionKind.ACTIVE_ONE
      payload: GameplayTable
    }
  | {
      type: TablesActionKind.ACTIVE_REMOVE
      payload: number
    }
  | {
      type: TablesActionKind.OPTIMISTIC_FOLD
      payload: {
        tableId: number
        username: string
      }
    }
  | {
      type: TablesActionKind.OPTIMISTIC_CHECK_OR_CALL
      payload: {
        tableId: number
        username: string
      }
    }
  | {
      type: TablesActionKind.OPTIMISTIC_BET
      payload: {
        tableId: number
        username: string
        value: number
      }
    }
  | {
      type: TablesActionKind.TIMEOUT_LEFT
      payload: number
    }

export const tablesReducer = (state: TablesState, action: TablesAction) => {
  const { payload, type } = action
  switch (type) {
    case TablesActionKind.CASH_ALL: {
      return produce(state, draft => {
        draft.cashTables = payload
        return draft
      })
    }
    case TablesActionKind.TOURNEYS_ALL: {
      return produce(state, draft => {
        draft.tourneys = payload
        return draft
      })
    }
    case TablesActionKind.CASH_ONE: {
      return produce(state, draft => {
        const i = draft.cashTables.findIndex(table => table.id === payload.id)
        if (i !== -1) {
          draft.cashTables[i] = payload
        } else {
          draft.cashTables.push(payload)
        }
        return draft
      })
    }
    case TablesActionKind.TOURNEYS_ONE: {
      return produce(state, draft => {
        const i = draft.tourneys.findIndex(tourney => tourney.id === payload.id)
        if (i !== -1) {
          draft.tourneys[i] = payload
        } else {
          draft.tourneys.push(payload)
        }
        // if (i !== -1) {
        //   draft.tourneys[i] = payload
        // } else {
        // }
        return draft
      })
    }
    case TablesActionKind.ACTIVE_ALL: {
      return produce(state, draft => {
        draft.activeTables = payload
        return draft
      })
    }
    case TablesActionKind.ACTIVE_ONE: {
      return produce(state, draft => {
        const i = draft.activeTables.findIndex(table => table.id === payload.id)
        if (i !== -1) {
          draft.activeTables[i] = payload
        } else {
          draft.activeTables.push(payload)
        }
        return draft
      })
    }
    case TablesActionKind.ACTIVE_REMOVE: {
      return produce(state, draft => {
        draft.activeTables = draft.activeTables.filter(table => table.id !== payload)
        return draft
      })
    }
    case TablesActionKind.OPTIMISTIC_FOLD: {
      const { tableId, username } = payload
      return produce(state, draft => {
        const table = draft.activeTables.find(_ => _.id === tableId)
        if (!table) return draft

        const hero = table.round.players.find(_ => _.username === username)
        if (!hero) return draft

        const { round } = table

        hero.isOut = true
        round.turnIndex = NaN
        round.isHeroTurn = false
        hero.isTurn = false
        round.prev = {
          username,
          type: 'FOLD',
        }
        return draft
      })
    }
    case TablesActionKind.OPTIMISTIC_CHECK_OR_CALL: {
      const { tableId, username } = payload

      return produce(state, draft => {
        const table = draft.activeTables.find(_ => _.id === tableId)
        if (!table) return draft

        const hero = table.round.players.find(_ => _.username === username)
        if (!hero) return draft

        const { round } = table

        if (round.toCall) {
          round.pot += round.toCall
          hero.chips -= round.toCall
          hero.bet = hero.bet + round.toCall
        }
        const type = round.toCall ? 'CALL' : 'CHECK'
        round.prev = { username, type }
        round.isHeroTurn = false
        hero.isTurn = false

        if (round.isLast && round.players.filter(player => !player.isOut).every(player => player.chips)) {
          switch (round.board.length) {
            case 0: {
              round.board.push(null, null, null)
              // if(round.allinShowdown) {
              //   round.board.push(null, null)
              // }
              break
            }
            case 3: {
              round.board.push(null)
              break
            }
            case 4: {
              round.board.push(null)
              break
            }
          }
        }
        return draft
      })
    }
    case TablesActionKind.OPTIMISTIC_BET: {
      const { tableId, username, value } = payload
      return produce(state, draft => {
        const table = draft.activeTables.find(_ => _.id === tableId)
        if (!table) return draft

        const hero = table.round.players.find(_ => _.username === username)
        if (!hero) return draft

        const { round } = table

        const bets = round.players.map(_ => _.bet).filter(_ => _)
        const diff = value - hero.bet

        const type = value === hero.chips ? 'ALL IN' : bets.length ? 'RAISE' : 'BET'
        round.prev = { username, type }
        hero.bet = value
        round.pot += diff
        hero.chips -= diff
        round.isHeroTurn = false
        hero.isTurn = false

        return draft
      })
    }
    case TablesActionKind.TIMEOUT_LEFT: {
      return produce(state, draft => {
        const table = draft.activeTables.find(_ => _.id === payload)
        if (!table) return draft
        table.round.isHeroTurn = false
        return draft
      })
    }
    default:
      return state
  }
}
