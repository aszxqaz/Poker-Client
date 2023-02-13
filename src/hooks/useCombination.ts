import { useMemo } from 'react'
import { Round } from '../types'
import { getCombination } from '../utils/combination'

export const useCombination = ({ cards, board }: Round) => {
  const combination = useMemo(() => {
    const filtered = board.filter(card => card !== null) as number[][]
    if (!cards.length || !filtered.length) return ''
    return getCombination(cards.concat(filtered))
  }, [board, cards])

  return { combination }
}
