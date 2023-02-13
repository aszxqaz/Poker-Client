import React, { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react'
import { CashTable, GameplayTable, Tourney, TourneyResult } from '../../types'
import { useUserContext } from '../UserContext'
import { mockedGameplayTable } from './mockedGameplayTable'
import { TablesActionKind, tablesReducer } from './tablesReducer'

type TablesContext = {
  cashTables: CashTable[]
  tourneys: Tourney[]
  activeTables: GameplayTable[]
  setCashTables: (tables: CashTable[]) => void
  addCashTable: (table: CashTable) => void
  setTourneys: (tables: Tourney[]) => void
  addTourney: (table: Tourney) => void
  addActiveTable: (table: GameplayTable) => void
  removeActiveTable: (tableId: number) => void
  setActiveTables: (tables: GameplayTable[]) => void
  optimisticFold: (tableId: number, username: string) => void
  optimisticCheckCall: (tableId: number, username: string) => void
  optimisticBet: (tableId: number, username: string, value: number) => void
  results: TourneyResult[]
  addResult: (result: TourneyResult) => void
  removeResult: (tourneyId: number) => void
  timeoutLeft: (tableId: number) => void
}

const TablesContext = createContext<TablesContext>({
  cashTables: [],
  tourneys: [],
  activeTables: [],
  setCashTables: () => {},
  addCashTable: () => {},
  setTourneys: () => {},
  addTourney: () => {},
  addActiveTable: () => {},
  removeActiveTable: () => {},
  setActiveTables: () => {},
  optimisticFold: () => {},
  optimisticCheckCall: () => {},
  optimisticBet: () => {},
  results: [],
  addResult: () => {},
  removeResult: () => {},
  timeoutLeft: () => {},
})

export const TablesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUserContext()
  const [{ cashTables, tourneys, activeTables }, dispatch] = useReducer(tablesReducer, {
    cashTables: [],
    tourneys: [],
    activeTables: [
      mockedGameplayTable
    ]
      ,
  })
  const [results, setResults] = useState<TourneyResult[]>([])

  const addResult = (result: TourneyResult) => {
    setResults(prev => [...prev, result])
  }

  const removeResult = (tourneyId: number) => {
    setResults(prev => prev.filter(result => result.tourney.id !== tourneyId))
  }

  const setCashTables = (tables: CashTable[]) => {
    dispatch({
      type: TablesActionKind.CASH_ALL,
      payload: tables,
    })
  }
  const addCashTable = (table: CashTable) => {
    dispatch({
      type: TablesActionKind.CASH_ONE,
      payload: table,
    })
  }
  const setTourneys = (tables: Tourney[]) => {
    dispatch({
      type: TablesActionKind.TOURNEYS_ALL,
      payload: tables,
    })
  }
  const addTourney = (table: Tourney) => {
    dispatch({
      type: TablesActionKind.TOURNEYS_ONE,
      payload: table,
    })
  }
  const setActiveTables = (tables: GameplayTable[]) => {
    dispatch({
      type: TablesActionKind.ACTIVE_ALL,
      payload: tables,
    })
  }
  const addActiveTable = (table: GameplayTable) => {
    dispatch({
      type: TablesActionKind.ACTIVE_ONE,
      payload: table,
    })
  }
  const removeActiveTable = (tableId: number) => {
    dispatch({
      type: TablesActionKind.ACTIVE_REMOVE,
      payload: tableId,
    })
  }
  const optimisticFold = (tableId: number, username: string) => {
    dispatch({
      type: TablesActionKind.OPTIMISTIC_FOLD,
      payload: {
        tableId,
        username,
      },
    })
  }
  const optimisticCheckCall = (tableId: number, username: string) => {
    dispatch({
      type: TablesActionKind.OPTIMISTIC_CHECK_OR_CALL,
      payload: {
        tableId,
        username,
      },
    })
  }
  const optimisticBet = (tableId: number, username: string, value: number) => {
    dispatch({
      type: TablesActionKind.OPTIMISTIC_BET,
      payload: {
        tableId,
        username,
        value,
      },
    })
  }
  const timeoutLeft = (tableId: number) => {
    dispatch({
      type: TablesActionKind.TIMEOUT_LEFT,
      payload: tableId,
    })
  }

  return (
    <TablesContext.Provider
      value={{
        cashTables,
        tourneys,
        setCashTables,
        addCashTable,
        setTourneys,
        addTourney,
        activeTables,
        addActiveTable,
        removeActiveTable,
        setActiveTables,
        optimisticFold,
        optimisticCheckCall,
        optimisticBet,
        results,
        addResult,
        removeResult,
        timeoutLeft,
      }}
    >
      {children}
    </TablesContext.Provider>
  )
}

export const useTablesContext = () => useContext(TablesContext)
