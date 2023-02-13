import { useReducer, useState } from 'react'
import { useTablesContext } from '../../../contexts'
import { CashTable, Tourney } from '../../../types'
import { formatBalance } from '../../../utils/format'
import { KeyOf } from '../../../utils/typescript'
import {
  lobbySelectReducer,
  LobbySelectState,
  getInitialState,
  LobbySelectorAction,
  useLobbySelectReducer,
} from '../lobbySelectReducer'
import { SelectOption } from '../Sng/useSngLobbyOptions'

export type CashTableOptionKey = KeyOf<CashTable, 'tableSize' | 'bb' | 'stack'>

export const useCashLobbyOptions = () => {
  const { cashTables } = useTablesContext()
  const selectOptions = [
    new SelectOption<CashTable, 'bb'>(
      'bb',
      'Blinds:',
      bb => `${formatBalance(bb / 2)} /  ${formatBalance(bb)}`
    ),
    new SelectOption<CashTable, 'tableSize'>('tableSize', 'Table size:', tableSize =>
      tableSize === 2 ? 'Heads Up' : `${tableSize}-max`
    ),
    new SelectOption<CashTable, 'stack'>('stack', 'Start stack:', stack => `${stack / 2} BB - ${stack} BB`),
  ]

  const { dispatch, state } = useLobbySelectReducer<CashTable, CashTableOptionKey>(
    cashTables,
    selectOptions.map(_ => _.key)
  )

  const selects = selectOptions.map(option => ({
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
