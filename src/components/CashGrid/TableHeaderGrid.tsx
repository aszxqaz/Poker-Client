import { Grid, GridItem, GridProps } from '@chakra-ui/react'
import { MouseEventHandler, useRef, useState } from 'react'
import { CashTable } from '../../types'
import { LobbyGridHeader } from '../LobbyGrid/LobbyGrid'

type Fn = (tables: CashTable[]) => CashTable[]

type TableHeaderGridProps = {
  onClick?: MouseEventHandler
  setFiltered: (fn: Fn) => void
}

export const TableHeaderGrid: React.FC<TableHeaderGridProps> = ({ onClick, setFiltered }) => {
  const sortToggler = useRef({
    name: 1,
    stakes: 1,
    tableSize: 1,
    stack: 1,
    buyin: 1,
    players: 1,
  })

  return (
    <LobbyGridHeader templateColumns="0.5fr 0.3fr 0.5fr 0.3fr 0.3fr 0.4fr 0.3fr" onClick={onClick}>
      <GridItem
        onClick={() => {
          setFiltered(tables => [
            ...tables.sort((a, b) =>
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
        Table
      </GridItem>
      <GridItem>Game</GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tables => [...tables.sort((a, b) => (a.bb - b.bb) * sortToggler.current.stakes)])
          sortToggler.current.stakes *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Stakes
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tables => [...tables.sort((a, b) => (a.tableSize - b.tableSize) * sortToggler.current.tableSize)])
          sortToggler.current.tableSize *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Table size
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tables => [...tables.sort((a, b) => (a.stack - b.stack) * sortToggler.current.stack)])
          sortToggler.current.stack *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Start stack
      </GridItem>
      <GridItem
        onClick={() => {
          setFiltered(tables => [
            ...tables.sort((a, b) => (a.bb * a.stack - b.bb * b.stack) * sortToggler.current.buyin),
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
          setFiltered(tables => [
            ...tables.sort((a, b) => (b.players.length - a.players.length) * sortToggler.current.players),
          ])
          sortToggler.current.players *= -1
        }}
        cursor="pointer"
        userSelect="none"
      >
        Players
      </GridItem>
    </LobbyGridHeader>
  )
}
