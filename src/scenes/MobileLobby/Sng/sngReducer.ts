// import produce from 'immer'
// import _ from 'lodash'
// import { Tourney } from '../../../types'
// import { Speed } from '../../../types/misc'

// type SngOptionsState = {
//   tourneys: Tourney[]
//   tourney: Tourney | undefined
//   buyins: number[]
//   tableSizes: number[]
//   speeds: Speed[]
//   selected: {
//     buyin: number
//     tableSize: number
//     speed: number
//   }
// }

// type SngOptionsAction =
//   | {
//       type: 'SET_BUYIN'
//       payload: number
//     }
//   | {
//       type: 'SET_TABLE_SIZE'
//       payload: number
//     }
//   | {
//       type: 'SET_SPEED'
//       payload: number
//     }

// export const sngOptionsReducer = (state: SngOptionsState, action: SngOptionsAction) => {
//   const { payload, type } = action
//   switch (type) {
//     case 'SET_BUYIN': {
//       return produce(state, draft => {
//         const { buyins, selected, speeds, tableSizes, tourney, tourneys } = draft
//         selected.buyin = payload

//         const tableSize = tableSizes[selected.tableSize]
//         const speed = speeds[selected.speed]

//         draft.tableSizes = getProps(tourneys, 'tableSize', {
//           buyin: buyins[selected.buyin],
//         }) as number[]

//         const tableSizeIndex = draft.tableSizes.findIndex(t => t === tableSize)
//         selected.tableSize = tableSizeIndex !== -1 ? tableSizeIndex : 0

//         draft.speeds = getProps(tourneys, 'speed', {
//           buyin: buyins[selected.buyin],
//           tableSize: tableSizes[selected.tableSize] as number,
//         }) as Speed[]

//         const speedIndex = draft.speeds.findIndex(t => t === speed)
//         selected.speed = speedIndex !== -1 ? speedIndex : 0

//         draft.tourney = findTourney(tourneys, {
//           buyin: buyins[selected.buyin],
//           tableSize: tableSizes[selected.tableSize],
//           speed: speeds[selected.speed],
//         })

//         return draft
//       })
//     }

//     case 'SET_TABLE_SIZE': {
//       return produce(state, draft => {
//         const { buyins, selected, speeds, tableSizes, tourney, tourneys } = draft
//         selected.tableSize = payload

//         const buyin = buyins[selected.buyin]
//         const speed = speeds[selected.speed]

//         draft.buyins = getProps(tourneys, 'buyin', {
//           tableSize: tableSizes[selected.tableSize],
//         }) as number[]

//         const buyinIndex = draft.buyins.findIndex(t => t === buyin)
//         selected.buyin = buyinIndex !== -1 ? buyinIndex : 0

//         draft.speeds = getProps(tourneys, 'speed', {
//           buyin: buyins[selected.buyin],
//           tableSize: tableSizes[selected.tableSize] as number,
//         }) as Speed[]

//         const speedIndex = draft.speeds.findIndex(t => t === speed)
//         selected.speed = speedIndex !== -1 ? speedIndex : 0

//         draft.tourney = findTourney(tourneys, {
//           buyin: buyins[selected.buyin],
//           tableSize: tableSizes[selected.tableSize],
//           speed: speeds[selected.speed],
//         })

//         return draft
//       })
//     }

//     case 'SET_SPEED': {
//       return produce(state, draft => {
//         const { buyins, selected, speeds, tableSizes, tourney, tourneys } = draft
//         selected.speed = payload

//         const buyin = buyins[selected.buyin]
//         const tableSize = tableSizes[selected.tableSize]

//         draft.buyins = getProps(tourneys, 'buyin', {
//           speed: speeds[selected.speed],
//         }) as number[]

//         const buyinIndex = draft.buyins.findIndex(t => t === buyin)
//         selected.buyin = buyinIndex !== -1 ? buyinIndex : 0

//         draft.tableSizes = getProps(tourneys, 'tableSize', {
//           buyin: buyins[selected.buyin],
//           speed: speeds[selected.speed],
//         }) as number[]

//         const tableSizeIndex = draft.tableSizes.findIndex(t => t === tableSize)
//         selected.tableSize = tableSizeIndex !== -1 ? tableSizeIndex : 0

//         draft.tourney = findTourney(tourneys, {
//           buyin: buyins[selected.buyin],
//           tableSize: tableSizes[selected.tableSize],
//           speed: speeds[selected.speed],
//         })

//         return draft
//       })
//     }
//   }
//   return state
// }

// export const getInitialState = (tourneys: Tourney[]): SngOptionsState => {
//   const selected = {
//     buyin: 0,
//     tableSize: 0,
//     speed: 0,
//   }
//   const buyins = _.uniq(tourneys.map(t => t.buyin))

//   const tableSizes = getProps(tourneys, 'tableSize', {
//     buyin: buyins[0],
//   }) as number[]

//   const speeds = getProps(tourneys, 'speed', {
//     buyin: buyins[0],
//     tableSize: tableSizes[0] as number,
//   }) as Speed[]

//   const tourney = tourneys.find(
//     t => t.buyin === buyins[0] && t.tableSize === tableSizes[0] && t.speed === speeds[0]
//   )

//   return {
//     tourneys,
//     buyins,
//     selected,
//     speeds,
//     tableSizes,
//     tourney,
//   }
// }

// export const findTourney = (
//   tourneys: Tourney[],
//   data: Partial<Pick<Tourney, 'buyin' | 'tableSize' | 'speed'>>
// ) => {
//   return tourneys.find(tourney => {
//     for (let key in data) {
//       if (tourney[key as keyof typeof data] !== data[key as keyof typeof data]) return false
//     }
//     return true
//   })
// }

// export const getProps = (
//   tourneys: Tourney[],
//   prop: 'buyin' | 'tableSize' | 'speed',
//   data: Partial<Pick<Tourney, 'buyin' | 'tableSize' | 'speed'>>
// ) => {
//   return _.uniq(
//     tourneys
//       .filter(tourney => {
//         for (let key in data) {
//           if (tourney[key as keyof typeof data] !== data[key as keyof typeof data]) return false
//         }
//         return true
//       })
//       .map(t => t[prop])
//   ).sort((a, b) => (a > b ? 1 : -1))
// }

// export const sngOptionsSelector = (state: SngOptionsState) => ({
//   buyin: state.buyins[state.selected.buyin],
//   tableSize: state.tableSizes[state.selected.tableSize],
//   speed: state.speeds[state.selected.speed],
// })

// function updateByBuyin(state: SngOptionsState, index: number) {}

export const a = 0