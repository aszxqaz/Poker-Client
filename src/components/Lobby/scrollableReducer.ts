import { produce } from 'immer'

const MIN_EXTENDED_LENGTH = 7

type ScrollableState = {
  initial: string[]
  tabs: {
    title: string
    key: number
  }[]
  tabIndex: number
}

type ScrollableAction =
  | {
      type: 'NEXT'
      count?: number
    }
  | {
      type: 'PREV'
      count?: number
    }

export const scrollableReducer = (state: ScrollableState, action: ScrollableAction) => {
  const getIndex = (index: number, length: number) => {
    return index < 0 ? length + index : index >= length ? index - length : index
  }

  switch (action.type) {
    case 'NEXT': {
      return produce(state, draft => {
        const { tabs, initial } = draft
        const count = action.count || 1
        for (let i = 0; i < count; i++) {
          tabs.shift() // remove first
          const lastValue = tabs[tabs.length - 1].title
          const index = initial.findIndex(_ => _ === lastValue)
          const nextIndex = (index + 1) % initial.length
          const nextLastValue = initial[nextIndex]

          tabs.push({ title: nextLastValue, key: Math.random() })

          draft.tabIndex = (draft.tabIndex + 1) % initial.length
        }

        return draft
      })
    }

    case 'PREV': {
      return produce(state, draft => {
        const { tabs, initial } = draft
        const count = action.count || 1
        for (let i = 0; i < count; i++) {
          tabs.pop() // remove last
          const firstValue = tabs[0].title
          const index = initial.findIndex(_ => _ === firstValue) - 1
          const firstIndex = index < 0 ? index + initial.length : index
          const nextFirstValue = initial[firstIndex]

          tabs.unshift({
            title: nextFirstValue,
            key: Math.random(),
          })

          draft.tabIndex--
          if (draft.tabIndex < 0) draft.tabIndex = initial.length + draft.tabIndex
        }
        return draft
      })
    }

    default:
      return state
  }
}

export const getInitialState = (initial: string[], tabIndex: number = 0): ScrollableState => {
  const offset = ((MIN_EXTENDED_LENGTH - 1) / 2) % initial.length
  const startIndex = initial.length - offset + tabIndex

  const tabs = []
  for (let i = 0; i < MIN_EXTENDED_LENGTH; i++) {
    tabs.push({ title: initial[(startIndex + i) % initial.length], key: Math.random() })
  }

  return {
    initial,
    tabs,
    tabIndex,
  }
}
