import { Grid, GridItem, GridProps } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { CashTable } from '../../types'

type TableRowGridProps = {
  table: CashTable
  formatFn: (num: number) => string
  isActive: boolean
  onClick: MouseEventHandler
  gridProps: GridProps
}

export const TableRowGrid: React.FC<TableRowGridProps> = ({
  table,
  formatFn,
  isActive,
  onClick,
  gridProps,
}) => {
  const { id, tableSize, name, players, bb, stack, playersCount } = table

  // const isRegistered = players.includes(user?.username || '')
  const stakes = `${formatFn(bb / 2)} / ${formatFn(bb)}`
  const buyin = `${formatFn((bb * stack) / 2)} - ${formatFn(bb * stack)}`

  return (
    <Grid
      key={id}
      {...gridProps}
      onClick={onClick}
      w="100%"
      borderBottom="1px solid var(--chakra-colors-gray-700)"
      bgColor={players.length ? 'rgb(255 255 255 / 3%)' : undefined}
      cursor="pointer"
      userSelect="none"
      // p="1em 0.5em"
      // backgroundColor={id === clickedGameId ? 'hsl(260, 26%, 20%)' : undefined}
      sx={
        isActive
          ? {
              ':not(:hover)': {
                bgColor: 'hsl(120deg 90% 50% / 5%)',
              },
              ':hover': {
                bgColor: 'hsl(120deg 90% 80% / 5%)',
              },
            }
          : {
              ':hover': {
                bgColor: 'hsl(220, 26%, 20%)',
              },
            }
      }
    >
      <GridItem>{name}</GridItem>
      <GridItem>NLH</GridItem>
      <GridItem>{stakes}</GridItem>
      <GridItem>{tableSize}</GridItem>
      <GridItem>{`≤ ${stack} BB`}</GridItem>
      <GridItem>{buyin}</GridItem>
      <GridItem>{`${playersCount} / ${tableSize}`}</GridItem>
    </Grid>
  )
}
