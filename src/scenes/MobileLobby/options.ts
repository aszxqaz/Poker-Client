import { CashTable, Tourney } from '../../types'
import { formatBalance } from '../../utils/format'
import { CashTableOptionKey } from './Cash/useCashLobbyOptions'
import { TourneyOptionKey } from './useLobbySelect'

type SelectOptions<T, K extends keyof T> = {
  [P in K]: K extends unknown
    ? {
        key: K
        label: string
        toDisplay: (value: T[K]) => string
      }
    : never
}

export const sngSelectOptions: SelectOptions<Tourney, TourneyOptionKey> = {
  buyin: {
    key: 'buyin',
    label: 'Buy-in:',
    toDisplay: buyin => formatBalance(buyin),
  },
  speed: {
    key: 'speed',
    label: 'Speed:',
    toDisplay: speed => speed[0].concat(speed.slice(1).toLowerCase()),
  },
  tableSize: {
    key: 'tableSize',
    label: 'Table size:',
    toDisplay: tableSize => (tableSize === 2 ? 'Heads Up' : `${tableSize}-max`),
  },
}

export const cashSelectOptions: SelectOptions<CashTable, CashTableOptionKey> = {
  bb: {
    key: 'bb',
    label: 'Blinds:',
    toDisplay: bb => `${formatBalance(bb / 2)} /  ${formatBalance(bb)}`,
  },
  tableSize: {
    key: 'tableSize',
    label: 'Table size:',
    toDisplay: tableSize => (tableSize === 2 ? 'Heads Up' : `${tableSize}-max`),
  },
  stack: {
    key: 'stack',
    label: 'Start stack:',
    toDisplay: stack => `${stack / 2} BB - ${stack} BB`
  }
}