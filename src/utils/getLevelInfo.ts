import { Speed, TourneyState } from "../types/misc"

export function getLevelInfo(speed: Speed) {
  switch (speed) {
    case 'ULTRA':
      return '1 min.'
    case 'HYPER':
      return '3 min.'
    case 'TURBO':
      return '5 min.'
    case 'REGULAR':
      return '10 min.'
    default:
      return ''
  }
}

export function getTourneyState(state: TourneyState) {
  return state.split('_').map(s => s[0].concat(s.toLowerCase().slice(1))).join(' ')
}