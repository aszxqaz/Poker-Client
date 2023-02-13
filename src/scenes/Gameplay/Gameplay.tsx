import { Box, BoxProps, Button, Flex, GlobalStyle, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { RiHistoryLine, RiInformationLine } from 'react-icons/ri'
import NewWindow from 'react-new-window'
import { SpringIn } from '../../components/Animation/SpringIn'
import { Controls } from '../../components/Table/Controls'
import { getRoundData } from '../../components/Table/getRoundData'
import { saveHandHistory } from '../../components/Table/HandHistory'
import { Table } from '../../components/Table/Table'
import { useTablesContext, useTabsContext } from '../../contexts'
import { useUserContext } from '../../contexts/UserContext'
import { useCombination } from '../../hooks/useCombination'
import { useSngInfoListener } from '../../socket/listeners'
import { GameplayTable } from '../../types'
import { getCombination } from '../../utils/combination'
import { NewTable } from '../NewTable/NewTable'
import { TourneyInfo } from '../TourneyInfo/TourneyInfo'
import { useGameplay } from './useGameplay'
import leather from '../../assets/images/textures/leather2.webp'

type GamePlayProps = {
  table: GameplayTable
}

export const Gameplay: React.FC<GamePlayProps> = ({ table }) => {
  const [infoToggler, setInfoToggler] = useState<null | boolean>(null)
  const { optimisticFold, optimisticCheckCall, optimisticBet, tourneys } = useTablesContext()
  useSngInfoListener(table.tourneyId)
  const { leaveCashTable, takeAction } = useGameplay()
  const { user } = useUserContext()
  const { getTabIndexByTableId } = useTabsContext()

  const tourney = tourneys.find(tourney => tourney.id === table.tourneyId)
  const tabIndex = getTabIndexByTableId(table.id)
  const isEven = typeof tabIndex === 'number' && tabIndex % 2 === 0

  useEffect(() => {
    ;(window as unknown as Window & { __callback: Function }).__callback = () => {
      setInfoToggler(null)
    }
  }, [])

  const { id: tableId, players: all, type } = table
  const {
    bb,
    board,
    buttonIndex,
    cards,
    minbet,
    isWaitingForBB,
    showdown,
    players,
    pot,
    isHeroTurn,
    prev,
    winners,
    toCall,
    allinShowdown,
  } = getRoundData(table, user.username)

  const hero = players.find(_ => _.username === user.username)

  const { combination } = useCombination(table.round)

  useEffect(() => {
    saveHandHistory(table)
  }, [table.round])

  return (
    <>
      <Flex flexGrow={1} justifyContent="center" flexDir="column" w="100%">
        <SpringIn direction={isEven ? 'to-left' : 'to-right'} style={{ display: 'flex', flexGrow: 1 }}>
          <NewTable table={table} />
          {/* <Table table={table} mt="14vh">
            <Flex pos="absolute" gap="0.5rem" top={0} left={0} transform="translate(-150%, -150%)">
              <TopLeftButton
                onClick={() => {
                  window.open(`/history?id=${table.id}`, '_blank', 'popup=true,width=1024,height=768')
                }}
                icon={<RiHistoryLine fontSize="4vh" />}
              />
              <TopLeftButton
                onClick={() => {
                  // window.open(`/tournament?id=${table.tourneyId}`, '_blank', 'popup=true,width=1024,height=768')
                  setInfoToggler(prev => (prev === null ? true : prev === true ? false : true))
                }}
                icon={<RiInformationLine fontSize="4vh" />}
              />
            </Flex>
          </Table> */}
        </SpringIn>
        <Flex
          as={motion.div}
          animate={{ opacity: 1 }}
          style={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          alignItems="flex-end"
          // position="fixed"
          bottom={0}
          mb="0.8vh"
          w="100%"
          justifyContent="space-between"
        >
          {table.type === 'CASH' ? (
            <Flex gap="1.6vh" m="0 0 0.4vh 0.8vh" alignItems="center">
              <Button
                h="10vh"
                w="25vh"
                p="0"
                fontSize="min(1.5vw, 32px)"
                onClick={() => leaveCashTable(tableId)}
              >
                Leave table
              </Button>
            </Flex>
          ) : null}
          <Text fontSize="2.5vh" ml="2rem" userSelect="none" pos="absolute">
            {combination}
          </Text>
          {table.round?.players.length > 1 ? (
            <>
              {isHeroTurn && !allinShowdown && hero ? (
                <Controls
                  heroBet={hero.bet}
                  chips={hero.chips}
                  isCash={type === 'CASH'}
                  pot={pot}
                  toCall={toCall}
                  minbet={minbet}
                  bets={players.map(player => player.bet)}
                  maxbet={hero.bet + hero.chips}
                  bb={bb}
                  isOn={true}
                  onTakeAction={(value: number) => {
                    takeAction(tableId, value)
                    if (value > 0) optimisticBet(tableId, user.username, value)
                    if (value === 0) optimisticCheckCall(tableId, user.username)
                    if (value === -1) optimisticFold(tableId, user.username)
                  }}
                  tableId={tableId}
                >
                  {combination}
                </Controls>
              ) : null}
              {isWaitingForBB ? (
                <Box m="auto" mb="8vh" textAlign="center" fontSize="3xl">
                  Waiting for big blind...
                </Box>
              ) : null}
              {/* {isSitOut ? (
              <Box m="auto" mb="8vh" textAlign="center" fontSize="3xl">
                Sit Out
              </Box>
            ) : null} */}
            </>
          ) : (
            <Box m="auto" mb="8vh" textAlign="center" fontSize="3xl">
              Waiting for opponents...
            </Box>
          )}
        </Flex>
      </Flex>
      {infoToggler !== null && table.tourneyId ? (
        <NewWindow
          features={{ height: 768, width: 1024 }}
          title={`${tourney?.name || ''} - Tournament Info`}
          copyStyles={true}
          // onUnload={() => {
          //   setInfoToggler(null)
          // }}
        >
          <TourneyInfo tourney={tourney} />
        </NewWindow>
      ) : null}
      {/* {infoToggler !== null ? <TourneyInfo tourneyId={table.tourneyId || 0} /> : null} */}
    </>
  )
}

type TopLeftButtonProps = {
  icon: ReactNode
} & BoxProps

const TopLeftButton: React.FC<TopLeftButtonProps> = ({ icon, ...boxProps }) => (
  <Box
    cursor="pointer"
    p="0.2vh"
    color="whiteAlpha.500"
    transition="0.2s ease"
    _hover={{
      color: 'whiteAlpha.800',
      '>svg': {
        filter: `drop-shadow(0 0 2px rgb(255 255 255 / 20%))
        drop-shadow(0 0 4px rgb(255 255 255 / 20%))
        drop-shadow(0 0 6px rgb(255 255 255 / 10%))`,
      },
    }}
    {...boxProps}
  >
    {icon}
  </Box>
)
