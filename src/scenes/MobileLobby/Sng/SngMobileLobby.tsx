import { Box, Button, Divider, Flex, Grid, GridItem, GridProps } from '@chakra-ui/react'
import { Fragment, useEffect } from 'react'
import { Fallback } from '../../../components/Fallback/Fallback'
import { Select } from '../../../components/Select/Select'
import { useTablesContext } from '../../../contexts'
import { useSngSocketEmitters } from '../../../socket/emitters'
import { sngSelectOptions } from '../options'
import { useLobbySelect } from '../useLobbySelect'
import { SngInfo } from './SngInfo'

type SngOptionsProps = {} & GridProps

export const SngMobileLobby: React.FC<SngOptionsProps> = ({ ...gridProps }) => {
  const { tourneys, join, unjoin } = useSngSocketEmitters()
  console.log(tourneys)
  const { state, selects, addItems } = useLobbySelect(
    tourneys,
    Object.keys(sngSelectOptions) as (keyof typeof sngSelectOptions)[]
  )
  useEffect(() => {
    addItems(tourneys)
  }, [tourneys])

  const { indecesMap, items, optionsMap, current } = state

  if (!tourneys.length) return <Fallback />

  console.log(selects)

  return (
    <Flex flexDir="column" flexGrow={1} h="100%" fontSize="1.3em">
      <Grid templateColumns="0.5fr 1fr" alignItems="center" rowGap="1em" {...gridProps}>
        {selects.map(select =>
          select.options?.length ? (
            <Fragment key={select.key}>
              <GridItem>{sngSelectOptions[select.key].label}</GridItem>
              <GridItem>
                <Select
                  options={select.options!.map(option => ({
                    text: sngSelectOptions[select.key].toDisplay(option as never),
                    value: option,
                  }))}
                  curIndex={indecesMap.get(select.key) || 0}
                  onSelectChange={select.onChange}
                />
              </GridItem>
            </Fragment>
          ) : null
        )}
      </Grid>
      {current ? (
        <>
          <Divider my="2em" />
          <SngInfo tourney={current} />
        </>
      ) : null}
      <Box mt="auto">
        <Button
          w="100%"
          onClick={() => {
            if (current?.id) join(current.id)
          }}
        >
          Play
        </Button>
      </Box>
    </Flex>
  )
}
