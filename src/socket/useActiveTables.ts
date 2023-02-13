// import { useRef, useState } from 'react'
// import { CashTable, Tourney } from '../api/response-types'
// import { useActiveTablesContext } from '../contexts/ActiveTables'
// import { useLobbyCashTablesContext } from '../contexts/LobbyTables'
// import { useSocketContext } from '../contexts/SocketContext'
// import { useTablesContext } from '../contexts/Tables/TablesContext'
// import { useTabsContext } from '../contexts/Tabs/Tabs'
// import { useUserContext } from '../contexts/UserContext'
// import { CashMessages } from './messages'
// import { useSocketListeners } from './useActiveTablesSocket'

// export const useSocketActiveTables = () => {
//   const { setActiveCashTables, setActiveTourneyTables, activeCashTables, activeTourneyTables } =
//     useActiveTablesContext()
//   const { setLobbyCashTables } = useLobbyCashTablesContext()
//   const { addTables, removeTable } = useTabsContext()
//   const user = useUserContext()

//   const activeCashTablesRef = useRef(activeCashTables)

//   const getRef = () => activeCashTablesRef

//   useSocketListeners({
//     'active.cash.all': (tables: CashTable[]) => {
//       setActiveCashTables(tables)
//       console.debug(`<active.cash.all> received`)
//       // tabsCountRef.current += tables.length
//       // setTabIndex(() => tabsCountRef.current - 1)
//       addTables(...tables.map(_ => _.id))
//     },
//     'active.tourneys.all': tables => {
//       setActiveTourneyTables(tables)
//       console.debug(`<active.tourneys.all> received`)
//     },
//     'active.cash.new': (table: CashTable) => {
//       setActiveCashTables(tables => [...tables, table])
//       setLobbyCashTables(tables => tables.map(_ => (_.id !== table.id ? _ : table)))
//       console.debug(`<active.cash.new> received`)
//       console.log(table)
//       addTables(table.id)
//     },
//     'active.cash.leave': table => {
//       console.debug(`<active.cash.leave> received. TableId: ${table.id}`)
//       setActiveCashTables(tables => tables.filter(_ => _.id !== table.id))
//       setLobbyCashTables(tables =>
//         tables.map(_ =>
//           _.id !== table.id
//             ? _
//             : {
//                 ..._,
//                 players: _.players.filter(p => p.username !== user.user?.username),
//               }
//         )
//       )
//       // const newTabIndex = --tabsCountRef.current - 1
//       // setTabIndex(() => (newTabIndex === 4 ? 0 : newTabIndex))
//       removeTable(table.id)
//     },
//     'active.cash.join': table => {
//       console.log(`<active.cash.join> received. Table: `, table)
//       console.dir(table)
//       setActiveCashTables(tables => tables.map(_ => (_.id === table.id ? table : _)))
//       setLobbyCashTables(tables => tables.map(_ => (_.id === table.id ? table : _)))
//     },
//     'active.cash.unjoin': table => {
//       console.log(`<active.cash.unjoin> received. Table: `, table)
//       console.dir(table)
//       setActiveCashTables(tables => tables.map(_ => (_.id === table.id ? table : _)))
//       setLobbyCashTables(tables => tables.map(_ => (_.id === table.id ? table : _)))
//     },
//     'round.started': table => {
//       setActiveCashTables(tables => tables.map(_ => (_.id !== table.id ? _ : { ..._, ...table })))
//       // if(table.round.state !== 'PLAYING') return
//       // const item = sessionStorage.getItem(table.id)

//       // let history
//       // if (item) {
//       //   history = JSON.parse(item)
//       //   history.rounds.push(table.round)
//       // } else {
//       //   const { round, ...tableWithoutRound } = table
//       //   history = Object.assign({}, tableWithoutRound)
//       //   history.rounds = [table.round]
//       // }
//       // console.log(item)
//       // sessionStorage.setItem(table.id.toString(), JSON.stringify(history))
//     },
//   })

//   return { activeCashTables, activeTourneyTables }
// }

export const a = 0