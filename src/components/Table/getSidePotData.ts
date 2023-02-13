import { GameplayTable } from '../../types'

export const getSidePotData = (round: GameplayTable['round']) => {
  const { players, pot } = round
  const sumOfBets = players.reduce((a, b) => a + b.bet, 0)

  let mainPot = pot
  let mainPotChipsValue = pot - sumOfBets
  let sidePots: { pot: number; key: string }[] = []
  let sidePotChipsValues: number[] = []

  const limits = players.filter(player => player.limit).sort((b, a) => a.limit - b.limit)

  if (limits.length) {
    sidePots = new Array(limits.length - 1)
      .fill({ pot: 0, key: '' })
      .map((_, i) => ({ pot: limits[i].limit - limits[i + 1].limit, key: limits[i].username }))

    sidePotChipsValues = [...sidePots.map(_ => _.pot)]

    mainPot = limits[limits.length - 1].limit
    mainPotChipsValue = mainPot

    sidePots.push({ pot: pot - mainPot - sidePots.reduce((a, b) => a + b.pot, 0), key: 'last' })
    sidePotChipsValues.push(sidePots[sidePots.length - 1].pot - sumOfBets)
  }

  return { mainPot, sidePots, sidePotChipsValues, mainPotChipsValue }
}
