import produce from 'immer'

export type TabsState = {
  tabIndex: number
  _tabsCount: number
  _tablesMap: Map<number, number>
}

type TabsAction =
  | {
      type: 'SET_TAB'
      payload: number
    }
  | {
      type: 'ADD_TABLES'
      payload: number[]
    }
  | {
      type: 'OPEN_TABLE'
      payload: number
    }
  | {
      type: 'REMOVE_TABLE'
      payload: number
    }
    | {
      type: 'SET_TAB_BY_TABLE_ID'
      payload: number
    }

export const tabsReducer = (state: TabsState, action: TabsAction): TabsState => {
  const { type, payload } = action
  switch (type) {
    case 'SET_TAB': {
      return {
        ...state,
        tabIndex: payload,
      }
    }
    case 'ADD_TABLES': {
      return produce(state, draft => {
        payload.forEach(tableId => {
          if (!draft._tablesMap.has(tableId)) {
            draft._tablesMap.set(tableId, draft._tabsCount + draft._tablesMap.size)
            draft.tabIndex = draft._tablesMap.get(payload[payload.length - 1]) || 0
          }
        })
        return draft
      })
    }
    case 'OPEN_TABLE': {
      return {
        ...state,
        tabIndex: state._tablesMap.get(payload) || 0,
      }
    }
    case 'REMOVE_TABLE': {
      return produce(state, draft => {
        const i = draft._tablesMap.get(payload) || 0
        draft._tablesMap.delete(payload)
        if (draft.tabIndex === draft._tabsCount + i && draft._tablesMap.size > 0) {
          draft.tabIndex = draft._tablesMap.size + draft._tabsCount - 1
        } else {
          draft.tabIndex = 0
        }
        return draft
      })
    }
    case 'SET_TAB_BY_TABLE_ID': {
      return produce(state, draft => {
        const tabIndex = draft._tablesMap.get(payload)
        if(tabIndex) {
          draft.tabIndex = tabIndex
        }
        return draft
      })
    }
    default:
      return state
  }
}
