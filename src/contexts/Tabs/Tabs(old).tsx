// import React, {
//   Children,
//   createContext,
//   PropsWithChildren,
//   useState,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   useRef,
//   MutableRefObject,
//   useReducer,
// } from 'react'

// type TabsContext = {
//   tabIndex: number
//   tabsCount: number
//   setTabIndex: Dispatch<SetStateAction<number>>
//   setTabsCount: Dispatch<SetStateAction<number>>
//   setToLastPlusOne: () => void
//   handleTabsChange: (index: number) => void
//   tabsCountRef: MutableRefObject<number>
//   openTable: (id: number) => void
//   tables: Record<string, number>[]
//   addTableToTab: (id: number) => void
// }

// const initialState = {
//   tabIndex: 0,
//   tabsCount: 0,
//   setTabIndex: () => {},
//   setTabsCount: () => {},
//   setToLastPlusOne: () => {},
//   handleTabsChange: () => {},
//   tabsCountRef: {
//     current: 0,
//   },
//   openTable: (id: number) => {},
//   tables: [],
//   addTableToTab: (id: number) => {}
// }

// const TabsContext = createContext<TabsContext>({
//   tabIndex: 0,
//   tabsCount: 0,
//   setTabIndex: () => {},
//   setTabsCount: () => {},
//   setToLastPlusOne: () => {},
//   handleTabsChange: () => {},
//   tabsCountRef: {
//     current: 0,
//   },
//   openTable: (id: number) => {},
//   tables: [],
//   addTableToTab: (id: number) => {}
// })

// export const TabsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const [tabIndex, setTabIndex] = useState<number>(0)
//   const [tabsCount, setTabsCount] = useState<number>(5)
//   const [tables, setTables] = useState<TabsContext['tables']>([])

//   const tabsCountRef = useRef(5)

//   const [tabsState, tabsDispatch] = useReducer<TabsContext>(initialState, (state, action) => state)

//   const handleTabsChange = (index: number) => {
//     setTabIndex(index)
//   }

//   const setToLastPlusOne = () => {
//     setTabIndex(tabsCount)
//   }

//   return (
//     <TabsContext.Provider
//       value={{
//         tabIndex,
//         tabsCount,
//         setTabsCount,
//         setTabIndex,
//         handleTabsChange,
//         setToLastPlusOne,
//         tabsCountRef,
//       }}
//     >
//       {children}
//     </TabsContext.Provider>
//   )
// }

// export const useTabsContext = () => useContext(TabsContext)

export const a = 0