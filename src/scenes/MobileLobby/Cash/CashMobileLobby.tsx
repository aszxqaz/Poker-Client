import { Box, Button, Divider, Flex, Grid, GridItem, GridProps } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Fallback } from '../../../components/Fallback/Fallback'
import { Select } from '../../../components/Select/Select'
import { useCashSocketEmitters } from '../../../socket/emitters'
import { cashSelectOptions } from '../options'
import { useLobbySelect } from '../useLobbySelect'
import { useCashLobbyOptions } from './useCashLobbyOptions'

type SngOptionsProps = {} & GridProps

export const CashMobileLobby: React.FC<SngOptionsProps> = ({ ...gridProps }) => {
  const { cashTables, joinTable } = useCashSocketEmitters()
  const { state, selects } = useLobbySelect(
    cashTables,
    Object.keys(cashSelectOptions) as (keyof typeof cashSelectOptions)[]
  )
  const { indecesMap, items, optionsMap, current } = state

  if (!cashTables.length) return <Fallback />

  return (
    <Flex flexDir="column" flexGrow={1} h="100%" fontSize="1.3em">
      <Grid templateColumns="0.5fr 1fr" alignItems="center" rowGap="1em" {...gridProps}>
        {selects.map(select => (
          <Fragment key={select.key}>
            <GridItem>{cashSelectOptions[select.key].label}</GridItem>
            <GridItem>
              <Select
                options={select.options!.map(option => ({
                  text: cashSelectOptions[select.key].toDisplay(option as never),
                  value: option,
                }))}
                curIndex={indecesMap.get(select.key) || 0}
                onSelectChange={select.onChange}
              />
            </GridItem>
          </Fragment>
        ))}
      </Grid>
      {current ? (
        <>
          <Divider my="2em" />
          {/* <SngInfo tourney={current} /> */}
        </>
      ) : null}
      <Box mt="auto">
        <Button w="100%">Play</Button>
      </Box>
    </Flex>
  )
}

export const a = 0
