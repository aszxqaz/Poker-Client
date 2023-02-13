import { GridItem } from '@chakra-ui/react'
import { MouseEventHandler, useRef } from 'react'
import { Tourney } from '../../types'
import { LobbyGridHeader } from '../LobbyGrid/LobbyGrid'

type Fn = (tourneys: Tourney[]) => Tourney[]

type TourneyHeaderGridProps = {
  onClick?: MouseEventHandler
  setFiltered: (fn: Fn) => void
}

export const TourneyHeaderGrid: React.FC<TourneyHeaderGridProps> = ({ onClick, setFiltered }) => {
  const sortToggler = useRef({
    starting: 1,
    name: 1,
    game: 1,
    buyin: 1,
    speed: 1,
    prizes: 1,
    tableSize: 1,
  })

  return (
    <LobbyGridHeader templateColumns="1fr 1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.7fr" onClick={onClick}>
      <GridItem
        onClick={() => {
          setFiltered(tourneys => [
            ...tourneys.sort((a, b) =>
              a.state < b.state ? -1 * sortToggler.current.starting : 1 * sortToggler.current.starting
            ),
          ])
          sortToggler.current.starting *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Starting
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tourneys => [
            ...tourneys.sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase()
                ? -1 * sortToggler.current.name
                : 1 * sortToggler.current.name
            ),
          ])
          sortToggler.current.name *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Name
      </GridItem>
      <GridItem cursor="pointer" userSelect="none">
        Game
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tourneys => [
            ...tourneys.sort((a, b) => (a.buyin - b.buyin) * sortToggler.current.buyin),
          ])
          sortToggler.current.buyin *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Buy-in
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tourneys => [
            ...tourneys.sort((a, b) =>
              a.speed.toLowerCase() < b.speed.toLowerCase()
                ? -1 * sortToggler.current.speed
                : 1 * sortToggler.current.speed
            ),
          ])
          sortToggler.current.speed *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Speed
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tourneys => [
            ...tourneys.sort(
              (a, b) =>
                (a.prizes.reduce((a, b) => a + b) - b.prizes.reduce((a, b) => a + b)) *
                sortToggler.current.buyin
            ),
          ])
          sortToggler.current.buyin *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Prize pool
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tourneys => [
            ...tourneys.sort((a, b) => (b.tableSize - a.tableSize) * sortToggler.current.tableSize),
          ])
          sortToggler.current.tableSize *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Players
      </GridItem>
    </LobbyGridHeader>
  )
}
