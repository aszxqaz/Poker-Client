import produce, { Draft } from 'immer'
import _ from 'lodash'
import { useReducer } from 'react'
import { Tourney } from '../../types'

export type ExtractString<T> = Extract<keyof T, string>

export type LobbySelectState<T, K extends ExtractString<T>> = {
  items: T[]
  current?: T
  indecesMap: Map<K, number>
  optionsMap: Map<K, T[K][]>
}

export type LobbySelectorAction<T, K extends ExtractString<T>> =
  | {
      type: 'SET'
      payload: {
        key: K
        index: number
      }
    }
  | {
      type: 'ITEMS_FETCHED'
      payload: T[]
    }

type State = {
  buyin: number
  tableSize: number
}

export const lobbySelectReducer = <T, K extends ExtractString<T>>(
  _state: LobbySelectState<T, K>,
  action: LobbySelectorAction<T, K>
) => {
  const { payload, type } = action

  switch (type) {
    case 'ITEMS_FETCHED': {
      return produce(_state, draft => {
        Object.assign(draft, getInitialState(payload, Array.from(_state.indecesMap.keys())))
        return draft
      })
    }
    case 'SET': {
      return produce(_state, state => {
        const payloadKey = payload.key as Draft<K>
        // setting index of the changed option
        state.indecesMap.set(payloadKey, payload.index)

        const options = state.optionsMap.get(payloadKey)!
        const index = state.indecesMap.get(payloadKey)!

        // setting initial search options
        const searchMap: Map<Draft<K>, Draft<T[K]>> = new Map()
        searchMap.set(payloadKey, options[index])

        const current: Map<Draft<K>, Draft<T[K]>> = new Map()
        for (const [key, index] of state.indecesMap) {
          const options = state.optionsMap.get(key)!
          current.set(key, options[index])
        }

        for (const [key] of state.indecesMap) {
          if (key === payload.key) continue
          const newOptions = getProps<T, K>(state.items as T[], key as K, searchMap as Map<K, T[K]>)
          state.optionsMap.set(key, newOptions as Draft<T[K]>[])
          const options = state.optionsMap.get(key)!
          const currentVal = current.get(key)!
          const indexFound = options.findIndex(_ => _ === currentVal)
          const actualIndex = indexFound !== -1 ? indexFound : 0
          state.indecesMap.set(key, actualIndex)
          // updating search options
          searchMap.set(key, options[actualIndex])
        }

        state.current = state.items.find(item => {
          for (const [key, options] of state.optionsMap) {
            const index = state.indecesMap.get(key)!
            if (item[key as keyof Draft<T>] !== options[index]) return false
          }
          return true
        })

        return state
      })
    }
  }
}

export const getProps = <T, K extends ExtractString<T>>(items: T[], prop: K, searchMap: Map<K, T[K]>) => {
  return _.uniq(
    items
      .filter(item => {
        for (let [key, value] of searchMap) {
          if (item[key] !== value) return false
        }
        return true
      })
      .map(t => t[prop])
  ).sort((a, b) => (a > b ? 1 : -1))
}

export const getInitialState = <T, K extends ExtractString<T>>(
  items: T[],
  keys: K[]
): LobbySelectState<T, K> => {
  const indecesMap = new Map<K, number>()
  const optionsMap = new Map<K, T[K][]>()

  for (const key of keys) {
    indecesMap.set(key, 0)
    optionsMap.set(
      key,
      _.uniq(items.map(item => item[key])).sort((a, b) => (a > b ? 1 : -1))
    )
  }

  const searchMap: Map<K, T[K]> = new Map()
  searchMap.set(keys[0], optionsMap.get(keys[0])![0])

  const currentOptions: Map<K, T[K]> = new Map()
  for (const [key, index] of indecesMap) {
    const options = optionsMap.get(key)!
    currentOptions.set(key, options[index])
  }

  for (const [key] of indecesMap) {
    if (key === keys[0]) continue
    const newOptions = getProps<T, K>(items, key, searchMap)
    optionsMap.set(key, newOptions)
    const options = optionsMap.get(key)!
    const currentVal = currentOptions.get(key)!
    const indexFound = options.findIndex(_ => _ === currentVal)
    const actualIndex = indexFound !== -1 ? indexFound : 0
    indecesMap.set(key, actualIndex)
    // updating search options
    searchMap.set(key, options[actualIndex])
  }

  const current = items.find(item => {
    for (const [key, options] of optionsMap) {
      const index = indecesMap.get(key)!
      if (item[key] !== options[index]) return false
    }
    return true
  })

  return {
    indecesMap,
    items,
    optionsMap,
    current,
  }
}

export const useLobbySelectReducer = <T, K extends ExtractString<T>>(items: T[], keys: K[]) => {
  const [state, dispatch] = useReducer(
    lobbySelectReducer as React.Reducer<LobbySelectState<T, K>, LobbySelectorAction<T, K>>,
    getInitialState(items, keys)
  )

  return { state, dispatch }
}
