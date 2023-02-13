import produce from 'immer'
import { DRAFTABLE } from 'immer/dist/internal'
import { CashTable, GameplayTable } from '../../types'
import { Round } from '../../types/round'

export type ReplayerState = {
  table: GameplayTable
  rounds: Round[]
  roundIndex: number
  isNextHandAvailable: boolean
  isPrevHandAvailable: boolean
  isStepForwardAvailable: boolean
  isStepBackAvailable: boolean
  isToBeginAvailable: boolean
  isToEndAvailable: boolean
}

type ReplayerAction = {
  type: 'STEP_FORWARD' | 'STEP_BACK' | 'PREV_HAND' | 'NEXT_HAND' | 'TO_BEGIN' | 'TO_END' | 'TO_HAND_START'
}

export const replayerReducer = (state: ReplayerState, action: ReplayerAction): ReplayerState => {
  const { type } = action
  switch (type) {
    case 'STEP_FORWARD': {
      return produce(state, draft => {
        if (draft.roundIndex < draft.rounds.length - 1) {
          draft.roundIndex++
          draft.isStepBackAvailable = true
          draft.isToBeginAvailable = true
          if (draft.rounds[draft.roundIndex].hand !== draft.rounds[draft.roundIndex - 1].hand) {
            draft.isPrevHandAvailable = true
          }

          if (draft.roundIndex === draft.rounds.length - 1) {
            draft.isStepForwardAvailable = false
            draft.isNextHandAvailable = false
            draft.isToEndAvailable = false
          }
          draft.table.round = draft.rounds[draft.roundIndex]
        } else {
        }
        return draft
      })
    }
    case 'STEP_BACK': {
      return produce(state, draft => {
        if (draft.roundIndex > 0) {
          draft.roundIndex--
          draft.isStepForwardAvailable = true
          draft.isToEndAvailable = true
          if (draft.rounds[draft.roundIndex].hand !== draft.rounds[draft.roundIndex + 1].hand) {
            draft.isNextHandAvailable = true
          }
          if (draft.roundIndex === 0) {
            draft.isStepBackAvailable = false
            draft.isPrevHandAvailable = false
            draft.isToBeginAvailable = false
          }
          draft.table.round = draft.rounds[draft.roundIndex]
        }
        return draft
      })
    }
    case 'PREV_HAND': {
      return produce(state, draft => {
        // skipping the same hand number that is the current round of
        let k = draft.roundIndex
        for (let i = k - 1; i > 0; i--) {
          if (
            draft.rounds[i].hand !== draft.rounds[draft.roundIndex].hand &&
            (draft.rounds[i].hand !== draft.rounds[i - 1].hand || !(i - 1 in draft.rounds))
          ) {
            k = i
            break
          }
        }
        if (k !== draft.roundIndex) {
          draft.isNextHandAvailable = true
          draft.isStepForwardAvailable = true
          draft.isToEndAvailable = true
        }
        if (k === draft.roundIndex) k = 0
        if (k == 0) {
          draft.isPrevHandAvailable = false
          draft.isStepBackAvailable = false
          draft.isToBeginAvailable = false
        }
        draft.roundIndex = k
        draft.table.round = draft.rounds[draft.roundIndex]
        draft.isStepForwardAvailable = true

        return draft
      })
    }
    case 'NEXT_HAND': {
      return produce(state, draft => {
        // skipping the same hand number that is the current round of
        let k = draft.roundIndex
        for (let i = k + 1; i < draft.rounds.length; i++) {
          if (draft.rounds[i].hand !== draft.rounds[draft.roundIndex].hand) {
            k = i
            break
          }
        }
        if (k === draft.rounds.length - 1) {
          draft.isNextHandAvailable = false
          draft.isStepForwardAvailable = false
          draft.isToEndAvailable = false
        }
        if (k !== draft.roundIndex) {
          draft.isPrevHandAvailable = true
          draft.isToBeginAvailable = true
          draft.isStepBackAvailable = true
        }
        const next = draft.rounds.slice(k + 1).find(round => round.hand !== draft.rounds[k].hand)
        if (!next) {
          draft.isNextHandAvailable = false
        }

        draft.roundIndex = k
        draft.table.round = draft.rounds[draft.roundIndex]

        return draft
      })
    }
    case 'TO_BEGIN': {
      return produce(state, draft => {
        draft.roundIndex = 0
        draft.table.round = draft.rounds[draft.roundIndex]
        draft.isStepBackAvailable = false
        draft.isStepForwardAvailable = true
        draft.isToBeginAvailable = false
        draft.isToEndAvailable = true
        draft.isNextHandAvailable = true
        draft.isPrevHandAvailable = false
        return draft
      })
    }
    case 'TO_END': {
      return produce(state, draft => {
        draft.roundIndex = draft.rounds.length - 1
        draft.table.round = draft.rounds[draft.roundIndex]
        draft.isStepBackAvailable = true
        draft.isStepForwardAvailable = false
        draft.isToBeginAvailable = true
        draft.isToEndAvailable = false
        draft.isPrevHandAvailable = true
        draft.isNextHandAvailable = false
        return draft
      })
    }
    case 'TO_HAND_START': {
      return produce(state, draft => {
        while (
          draft.roundIndex > 0 &&
          draft.rounds[draft.roundIndex - 1].hand === draft.rounds[draft.roundIndex].hand
        ) {
          draft.roundIndex--
        }
        draft.table.round = draft.rounds[draft.roundIndex]
        return draft
      })
    }
    default:
      return state
  }
}
