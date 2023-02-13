import { useTablesContext } from '../../../contexts'
import { Tourney } from '../../../types'
import { formatBalance } from '../../../utils/format'
import { KeyOf } from '../../../utils/typescript'
import { useLobbySelectReducer } from '../lobbySelectReducer'

export type TourneyOptionKey = KeyOf<Tourney, 'buyin' | 'tableSize' | 'speed'>

type ToDisplay<T, K extends keyof T> = (value: T[K]) => string

export class SelectOption<T, K extends keyof T = keyof T> {
  constructor(public key: K, public label: string, public toDisplay: (value: any) => string) {}
}

export const useSngLobbyOptions = () => {
  const { tourneys } = useTablesContext()
  const lobbySelectOptions = [
    new SelectOption<Tourney, 'buyin'>('buyin', 'Buy in:', buyin => formatBalance(buyin)),
    new SelectOption<Tourney, 'tableSize'>('tableSize', 'Table size:', tableSize =>
      tableSize === 2 ? 'Heads Up' : `${tableSize}-max`
    ),
    new SelectOption<Tourney, 'speed'>('speed', 'Speed:', speed =>
      speed[0].concat(speed.slice(1).toLowerCase())
    ),
  ]

  const { dispatch, state } = useLobbySelectReducer<Tourney, TourneyOptionKey>(
    tourneys,
    lobbySelectOptions.map(_ => _.key)
  )

  const selects = lobbySelectOptions.map(option => ({
    ...option,
    set: (index: number) => {
      dispatch({
        type: 'SET',
        payload: {
          index,
          key: option.key,
        },
      })
    },
    options: state.optionsMap.get(option.key)
  }))

  return { state, selects }
}
