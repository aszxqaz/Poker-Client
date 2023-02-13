const Suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
const Ranks = [
  'Deuce',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King',
  'Ace',
]

const sortDesc = (cards: number[][]) => {
  return cards.sort((a, b) => b[0] - a[0])
}

export const getCombination = (cards: number[][]) => {
  const sorted = sortDesc(cards)
  const fns = [
    getRoyalFlush,
    getStraightFlush,
    getFourOfAKind,
    getFullHouse,
    getFlush,
    getStraight,
    getThreeOfAKind,
    getTwoPair,
    getPair,
    getHighCard,
  ]
  for (let i = 0; i < fns.length; i++) {
    const fn = fns[i]
    const combination = fn(sorted)
    if (combination) return combination
  }
  return ''
}

const filterMoreThanFourSuit = (sorted: number[][]): number[][] | null => {
  let filtered: number[][] = []
  for (let i = 0; i < 4; i++) {
    filtered = sorted.filter(_ => _[1] === i)
    if (filtered.length > 4) break
  }
  if (filtered.length < 5) return null
  return filtered
}

const getRoyalFlush = (sorted: number[][]) => {
  const filtered = filterMoreThanFourSuit(sorted)
  if (!filtered || filtered[0][0] !== 12) return null

  for (let i = 1; i < 5; i++) if (filtered[i][0] !== filtered[i - 1][0] - 1) return null

  return `Royal Flush of ${Suits[filtered[0][1]]}s.`
}

const getStraightFlush = (sorted: number[][]) => {
  const filtered = filterMoreThanFourSuit(sorted)
  if (!filtered) return null

  let startIndex = 0
  let count = 1

  for (let i = 1; i < filtered.length; i++) {
    if (filtered[i][0] === filtered[i - 1][0] - 1) {
      if (++count === 5) {
        return `Straight Flush. From ${Ranks[filtered[startIndex + 4][0]]} to ${
          Ranks[filtered[startIndex][0]]
        }.`
      }
    } else {
      startIndex++
      count = 1
    }
    // if (5 - count > filtered.length - i) return false
  }

  const len = filtered.length

  if (
    filtered[0][0] === 12 && // A
    filtered[len - 1][0] === 0 && // 2
    filtered[len - 2][0] === 1 && // 3
    filtered[len - 3][0] === 2 && // 4
    filtered[len - 4][0] === 3 // 5
  )
    return `Straight Flush, from Ace to Five`
}

const getFourOfAKind = (sorted: number[][]) => {
  let count = 1
  let isKickerFirst = false

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] === sorted[i - 1][0]) {
      count++
      if (count === 4) {
        return `Four of a Kind, ${Ranks[sorted[i][0]]}s.`
      }
    } else {
      count = 1
    }
    // 0 1 3 4 5 6 7
    if (5 - count > sorted.length - i) return false
  }
}

const getFullHouse = (sorted: number[][]) => {
  let couple: null | number = null
  let triple: null | number = null
  let temp: null | number = null
  let count = 1

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] === sorted[i - 1][0]) {
      if (++count === 2) {
        if (couple === null || triple !== null) {
          couple = sorted[i][0]
        } else {
          temp = sorted[i][0]
        }
      }
      if (count === 3) {
        if (triple !== null) {
          couple = sorted[i][0]
        } else {
          triple = sorted[i][0]
          if (triple === couple) couple = null
        }
        count = 1
      }
    } else {
      count = 1
    }

    if (couple === null && triple === null && i > sorted.length - 4) return false

    if (couple !== null && triple !== null) return `Full House, ${Ranks[triple]}s and ${Ranks[couple]}s.`
  }

  return false
}

const getFlush = (sorted: number[][]) => {
  const filtered = filterMoreThanFourSuit(sorted)
  if (!filtered) return null

  return `Flush of ${Suits[filtered[0][1]]}.`
}

const getStraight = (sorted: number[][]) => {
  let count = 1
  let startIndex = 0
  let unduped = Array.from(new Set(sorted.map(_ => _[0])))

  for (let i = 1; i < unduped.length; i++) {
    if (unduped[i] === unduped[i - 1] - 1) {
      count++
      if (count === 5)
        return `Straight, from ${Ranks[unduped[startIndex + 4]]} to ${Ranks[unduped[startIndex]]}.`
    } else {
      count = 1
      startIndex++
    }
    // if (4 - count > unduped.length - i) return false
  }

  const len = unduped.length

  if (
    unduped[0] === 12 && // A
    unduped[len - 1] === 0 && // 2
    unduped[len - 2] === 1 && // 3
    unduped[len - 3] === 2 && // 4
    unduped[len - 4] === 3 // 5
  )
    return `Straight, from Ace to Five`

  return false
}

const getThreeOfAKind = (sorted: number[][]) => {
  let count = 1
  let startIndex = 0

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] === sorted[i - 1][0]) {
      if (++count === 3) {
        return `Three of a Kind, ${Ranks[sorted[i][0]]}s.`
      }
    } else {
      count = 1
    }
  }
  return false
}

const getTwoPair = (sorted: number[][]) => {
  const pairs: number[] = []
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] === sorted[i - 1][0]) {
      pairs.push(sorted[i][0])
      if (pairs.length === 2) return `Two Pair, ${Ranks[pairs[0]]}s and ${Ranks[pairs[1]]}s.`
    }
  }
}

const getPair = (sorted: number[][]) => {
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] === sorted[i - 1][0]) {
      const rest = ([] as number[][]).concat(sorted.slice(0, i - 1), sorted.slice(i + 1)).slice(0, 3)
      return `Pair of ${Ranks[sorted[i][0]]}s.`
    }
  }
}

const getHighCard = (sorted: number[][]) => {
  return `High Card: ${Ranks[sorted[0][0]]}.`
}
