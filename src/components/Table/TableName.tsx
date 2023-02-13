import { Text, TextProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTablesContext } from '../../contexts'
import { GameplayTable } from '../../types'
import { formatBalance } from '../../utils/format'

type TableNameProps = {
  table: GameplayTable
} & TextProps

export const TableName: React.FC<TableNameProps> = ({ table }) => {
  const { tourneys, cashTables } = useTablesContext()
  const tourney = tourneys.find(tourney => tourney.id === table.tourneyId)
  const cashTable = cashTables.find(cashTable => cashTable.id === table.id)

  let tableName: ReactNode = null

  const sb = table.round.bb / 2
  const bb = table.round.bb

  switch (table.type) {
    case 'CASH': {
      const tableSize = cashTable?.tableSize === 2 ? 'Heads Up' : `${cashTable?.tableSize}-Max`
      tableName = (
        <>
          {table.name} - No Limit Holdem
          <br />
          {tableSize} Cash
          <br />
          {formatBalance(table.round.bb * 50)} / {formatBalance(table.round.bb * 100)}
        </>
      )
      break
    }
    case 'TOURNEY': {
      tableName = (
        <>
          {table.name} {tourney?.type} - No Limit Holdem <br /> Blinds:&nbsp;&nbsp;
          {sb.toLocaleString()}&nbsp;/&nbsp;{bb.toLocaleString()}
        </>
      )
      break
    }
  }
  return (
    <Text
      mt="2vh"
      userSelect="none"
      fontSize="clamp(0.8rem, 0.7vw + 0.6rem, 1.25rem)"
      fontWeight="600"
      color="whiteAlpha.500"
      w="max-content"
    >
      {tableName}
    </Text>
  )
}
