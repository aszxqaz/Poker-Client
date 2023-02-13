import React, { createContext, PropsWithChildren, useCallback, useContext, useReducer } from 'react'
import { tabsReducer, TabsState } from './reducer'

type TabsContext = Pick<TabsState, 'tabIndex'> & {
  setTabIndex: (index: number) => void
  addTables: (...tableIds: number[]) => void
  openTable: (tableId: number) => void
  removeTable: (tableId: number) => void
  getTabIndexByTableId: (tableId: number) => number | undefined
  setTabIndexByTableId: (tableId: number) => void
}

const TabsContext = createContext<TabsContext>({
  tabIndex: 0,
  setTabIndex: () => {},
  addTables: () => {},
  openTable: () => {},
  removeTable: () => {},
  getTabIndexByTableId: () => undefined,
  setTabIndexByTableId: () => {}
})

export const TabsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(tabsReducer, {
    tabIndex: 0,
    _tabsCount: 5,
    _tablesMap: new Map(),
  })

  const setTabIndex = (tabIndex: number) => {
    dispatch({
      type: 'SET_TAB',
      payload: tabIndex,
    })
  }

  const addTables = (...tableIds: number[]) => {
    dispatch({
      type: 'ADD_TABLES',
      payload: tableIds,
    })
  }

  const openTable = (tableId: number) => {
    dispatch({
      type: 'OPEN_TABLE',
      payload: tableId,
    })
  }

  const removeTable = (tableId: number) => {
    dispatch({
      type: 'REMOVE_TABLE',
      payload: tableId,
    })
  }

  const setTabIndexByTableId = (tableId: number) => {
    dispatch({
      type: 'SET_TAB_BY_TABLE_ID',
      payload: tableId
    })
  }

  const getTabIndexByTableId = (tableId: number) => {
    return state._tablesMap.get(tableId)
  }

  return (
    <TabsContext.Provider
      value={{
        tabIndex: state.tabIndex,
        setTabIndex,
        addTables,
        openTable,
        removeTable,
        getTabIndexByTableId,
        setTabIndexByTableId
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export const useTabsContext = () => useContext(TabsContext)
