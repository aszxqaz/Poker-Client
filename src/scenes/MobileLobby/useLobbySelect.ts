import { Tourney } from '../../types'
import { formatBalance } from '../../utils/format'
import { KeyOf } from '../../utils/typescript'
import { ExtractString, useLobbySelectReducer } from './lobbySelectReducer'

export type TourneyOptionKey = KeyOf<Tourney, 'buyin' | 'tableSize' | 'speed'>

export const useLobbySelect = <T, K extends ExtractString<T>>(items: T[], keys: K[]) => {
  const { dispatch, state } = useLobbySelectReducer<T, K>(items, keys)

  const selects = keys.map(key => ({
    key,
    onChange: (index: number) => {
      dispatch({
        type: 'SET',
        payload: {
          index,
          key,
        },
      })
    },
    options: state.optionsMap.get(key),
  }))

  const addItems = (items: T[]) => {
    dispatch({
      type: 'ITEMS_FETCHED',
      payload: items
    })
  }

  return { state, selects, addItems  }
}
