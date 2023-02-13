import { useReducer } from 'react'
import { CashTable, GameplayTable } from '../../types'
import { Round } from '../../types/round'
import { replayerReducer, ReplayerState } from './reducer'

export const useReplayerReducer = (tableId: number) => {
  const [state, dispatch] = useReducer(replayerReducer, tableId, (tableId): ReplayerState => {
    const item = sessionStorage.getItem(tableId.toString() || '')
    const history = JSON.parse(item!)

    const { rounds, ...table } = JSON.parse(item!) as GameplayTable & {
      rounds: Round[]
    }

    for (let i = 0; i < rounds.length; i++) {
      if (rounds[i].showdown.length) {
        let j = 1
        while (i - j in rounds && rounds[i - j].hand === rounds[i].hand) {
          rounds[i - j].showdown = rounds[i].showdown
          j++
        }
      }
    }

    const isPrevHandAvailable = !!rounds.find(round => round.hand !== rounds[rounds.length - 1].hand)

    const isStepBackAvailable = rounds.length > 1

    return {
      table: {
        ...table,
        round: rounds[rounds.length - 1],
      },
      rounds,
      roundIndex: rounds.length - 1,
      isNextHandAvailable: false,
      isPrevHandAvailable,
      isStepForwardAvailable: false,
      isStepBackAvailable,
      isToBeginAvailable: isStepBackAvailable,
      isToEndAvailable: false,
    }
  })

  return { state, dispatch }
}
