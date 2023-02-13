import { Box, BoxProps, Flex, Grid, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { StaatlichesRanks } from '../../components/Rank/paths'
import { ButtonChip } from '../../components/Table/ButtonChip'
import { Card } from '../../components/Table/Card'
import { ChipStack } from '../../components/Table/ChipStack'
import { LANDSCAPE_CHIPS_STACK_POSITIONS } from '../../components/Table/config/chips'
import { PORTRAIT_CHIPS_STACK_POSITIONS } from '../../components/Table/config/chipsPortrait'
import { getRoundData } from '../../components/Table/getRoundData'
import { getSidePotData } from '../../components/Table/getSidePotData'
import { TableLogo } from '../../components/Table/misc'
import { MobilePlate } from '../../components/Table/MobilePlate'
import { PotChipStack } from '../../components/Table/PotChipStack'
import { PotSum } from '../../components/Table/PotSum'
import { Progressbar } from '../../components/Table/Progressbar'
import { Signal } from '../../components/Table/Signal'
import { TableName } from '../../components/Table/TableName'
import { useTablesContext, useUserContext } from '../../contexts'
import { suitGradients } from '../../styles/suitGradients'
import { GameplayTable, Round } from '../../types'
import { getCombination } from '../../utils/combination'
import { isEqualUsername } from '../../utils/equal'
import { formatBalance } from '../../utils/format'
import {
  CIRCLE_PLATES_POSITIONS_PORTRAIT,
  RECT_PLATES_POSITIONS_PORTRAIT,
  PLATES_POSITIONS_LANDSCAPE,
} from './config'
import { GrayBorderOfTable, GreenPartOfTable } from './misc'
import { SuitColors } from './SuitColors'
import { useDimensions } from './useDimensions'

type TableProps = {
  table: GameplayTable
  isReplay?: boolean
}

export const NewTable: React.FC<PropsWithChildren<TableProps & BoxProps>> = ({
  table,
  isReplay,
  children,
  ...boxProps
}) => {
  const { tableRect, changeTableRect, isPortrait, screenHeight, screenWidth } = useDimensions()
  const { height, width } = tableRect
  const user = useUserContext()
  const { timeoutLeft } = useTablesContext()

  const { type, tableSize } = table
  const {
    bb,
    board,
    buttonIndex,
    cards,
    minbet,
    isWaitingForBB,
    showdown,
    players,
    TURN_TIMEOUT,
    turnIndex,
    pot,
    isLast,
    isHeroTurn,
    prev,
    timestamp,
    winners,
    toCall,
    allinShowdown,
  } = getRoundData(table, user.user?.username)

  const hero = players.find(_ => _.username === user.user?.username)

  const betsSum = players.reduce((a, b) => a + b.bet, 0)

  const boardLen = useRef(board.length)
  const tableRef = useRef<HTMLDivElement>()

  const [boardWithPlaceholders, setBoardWithPlaceholders] = useState<Round['board']>([])

  useEffect(() => {
    if (board.length !== boardLen.current) {
      boardLen.current = board.length
    }
  }, [board])

  const combination = useMemo(() => {
    const filtered = board.filter(card => card !== null) as number[][]
    if (!cards.length || !filtered.length) return ''
    return getCombination(cards.concat(filtered))
  }, [board.length, cards.length])

  const formatFn =
    type === 'CASH' ? (amount: number) => formatBalance(amount) : (amount: number) => amount.toLocaleString()

  useEffect(() => {
    window.oncontextmenu = function () {
      // showCustomMenu()
      // return false // cancel default menu
    }
  }, [])

  const { mainPot, sidePots, mainPotChipsValue, sidePotChipsValues } = getSidePotData(table.round)

  const PlateComponent = MobilePlate

  const tableSizes = [2, 3, 4, 6, 9]

  const [index, setIndex] = useState(0)
  const [tableHeight, setTableHeight] = useState(0)

  const renderWidth = tableHeight && isPortrait ? tableHeight / 2 : width

  const isDesktopPlates = !isPortrait || screenWidth > renderWidth * 1.8

  const sqrt = Math.sqrt(renderWidth * height)

  return (
    // <Box w="100%" p="25%" pos="relative">
    <Flex
      flexDir="column"
      flexGrow={1}
      fontSize={`clamp(0.6rem, ${sqrt / 800}rem, 1rem)`}
      {...boxProps}
      mb={isPortrait ? '2rem' : undefined}
      onClick={() => {
        setIndex(prev => (prev === tableSizes.length - 1 ? 0 : prev + 1))
      }}
    >
      <Box pos="fixed" left="0" zIndex={5} color="yellow">
        <>
          tableSize: {tableSizes[index]} <br />
          screenWidth: {screenWidth} <br />
          screenWidth: {screenHeight}
          <br />
          computedHeight {tableHeight} <br />
          {StaatlichesRanks} <br />
          isPortrait: {isPortrait.toString()}
          <br />
          renderWidth: {renderWidth}
          <br />
          height: {height}
          <br />
          desktopPlate: {isDesktopPlates.toString()} <br />
          condition: {(screenWidth > width * 1.8).toString()}
        </>
      </Box>
      <SuitColors colors={suitGradients} />
      <GrayBorderOfTable
        isPortrait={isPortrait}
        w={renderWidth}
        h={height}
        onHeightCalculated={h => {
          if (h) {
            setTableHeight(h)
          }
        }}
      >
        <GreenPartOfTable isPortrait={isPortrait} ratio={width / height}>
          <TableLogo
            top={isPortrait ? '37%' : '48%'}
            w={isPortrait ? height && height * 0.25 : width && width * 0.2}
          >
            <TableName table={table} pos="absolute" top="100%" />
          </TableLogo>
          {players.slice(0, tableSizes[index]).map((player, i, arr) => {
            const _platesPositions =
              isPortrait && isDesktopPlates
                ? RECT_PLATES_POSITIONS_PORTRAIT
                : isPortrait
                ? CIRCLE_PLATES_POSITIONS_PORTRAIT
                : PLATES_POSITIONS_LANDSCAPE

            const _chipsPositions = isPortrait
              ? PORTRAIT_CHIPS_STACK_POSITIONS
              : LANDSCAPE_CHIPS_STACK_POSITIONS
            const platesPos = _platesPositions[tableSizes[index] as keyof typeof _platesPositions][i]
            const chipsPos =
              ('chipsPos' in platesPos && platesPos?.chipsPos) ||
              _chipsPositions[tableSizes[index] as keyof typeof _chipsPositions][i]
            const opacity = player.isOut || player.isSitOut ? 0.5 : 1
            const showdownPlayer = showdown.find(isEqualUsername(player))
            const hand =
              player.username === user.user?.username ? cards : showdownPlayer ? showdownPlayer.cards : []

            return (
              <PlateComponent
                key={`plate-${player.username}`}
                opacity={opacity}
                username={player.username}
                chips={player.chips}
                isCash={type === 'CASH'}
                avatar={table.players.find(isEqualUsername(player))?.avatar}
                // avatar={' '}
                pos="absolute"
                // bgColor={
                //   winners.find(winner => winner.username === player.username && winner.isHighlighted)
                //     ? '#687c2da1'
                //     : 'gray.700'
                // }
                // borderColor={player.isTurn && !isReplay ? 'rgba(255,255,255,20%)' : undefined}
                // borderWidth={player.isTurn && !isReplay ? '3px' : undefined}
                {...platesPos}
                // transform="translate(-50%, -50%)"
                reversed={'reversed' in platesPos && platesPos.reversed}
                isPortrait={!isDesktopPlates}                
              >
                <>
                  {prev &&
                  prev.username === player.username &&
                  !['BET', 'ALL IN', 'CHECK'].includes(prev.type) ? (
                    <Signal fadeOut={true}>{prev.type}</Signal>
                  ) : null}
                  {prev &&
                  prev.username === player.username &&
                  ['BET', 'ALL IN', 'CHECK'].includes(prev.type) ? (
                    <Signal fadeOut={true}>{prev.type}</Signal>
                  ) : null}
                  {player.isTurn && !isReplay ? (
                    <motion.div
                      style={{ position: 'absolute', inset: 0, backgroundColor: 'white' }}
                      initial={{ opacity: 0.08 }}
                      animate={{ opacity: 0.1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeIn' }}
                    />
                  ) : null}
                  {player.isSitOut ? (
                    <Box
                      pos="absolute"
                      left="0"
                      right="0"
                      // top={parseInt(pos.top) > 20 ? '103%' : undefined}
                      // bottom={parseInt(pos.top) <= 20 ? '103%' : undefined}
                      fontSize="2vh"
                      borderRadius="md"
                      background="rgb(0 0 0 / 50%)"
                      textAlign="center"
                      letterSpacing="0.1vh"
                    >
                      SIT OUT
                    </Box>
                  ) : null}
                  {player.username === user.user?.username || showdown ? (
                    <Grid
                      pos="absolute"
                      top={player.username === user.user?.username ? `105%` : `initial`}
                      bottom={showdownPlayer ? `105%` : `initial`}
                      left="50%"
                      transform="translateX(-50%)"
                      m="auto"
                      mt="0.2vh"
                      w="20vh"
                      columnGap="0.7vh"
                      templateColumns="1fr 1fr"
                      alignItems="center"
                    >
                      {hand.map(card => (
                        <Card card={card} key={`${player.username}${card[0]}${card[1]}`} size="lg" />
                      ))}
                    </Grid>
                  ) : null}
                  {player.isTurn && !isReplay ? (
                    <Progressbar
                      timestamp={timestamp}
                      timeout={TURN_TIMEOUT}
                      onTimeoutLeft={() => {
                        timeoutLeft(table.id)
                      }}
                    />
                  ) : null}

                  <React.Fragment key={`chips-stack${player.username}`}>
                    <AnimatePresence>
                      {player.bet ? (
                        <motion.div
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ position: 'absolute', ...chipsPos }}
                          exit={{
                            left: '46%',
                            top: '25%',
                            opacity: 0.4,
                          }}
                        >
                          <ChipStack
                            value={player.bet}
                            reversed={'reversed' in chipsPos ? chipsPos.reversed : false}
                            isCash={table.type === 'CASH'}
                          >
                            {formatFn(player.bet)}
                          </ChipStack>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    {i === buttonIndex ? (
                      <ButtonChip key={`button-${player.username}`} pos="absolute" />
                    ) : null}
                  </React.Fragment>
                </>
              </PlateComponent>
            )
          })}
          {/* ------------ */}
          {/*     BOARD    */}
          {/* ------------ */}
          <Box
            pos="absolute"
            minH="4.5vh"
            zIndex={2}
            top={isPortrait ? '70%' : '50%'}
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Grid pos="relative" gridTemplateColumns="repeat(5, 1fr)" columnGap="0.8vh">
              {(false ? boardWithPlaceholders : board).map((card, i) => (
                <Card card={card} key={`${card !== null ? card[0] : i}${card !== null ? card[1] : i}`} />
              ))}
            </Grid>
            {/* ------------ */}
            {/*    POT SUM   */}
            {/* ------------ */}
            {pot ? (
              <>
                <PotSum
                  pos="absolute"
                  left="50%"
                  top={!board.length && false ? '240%' : 0}
                  transform="translate(-50%, -120%)"
                  // fontSize="2vh"
                  // fontSize="clamp(0.75rem, 0.7vw + 0.5rem, 1.25rem)"
                >
                  <Box color="green.300" fontSize="inherit">
                    Pot:{' '}
                    <Text as="span" color="white" fontSize="inherit">
                      {formatFn(pot)}
                    </Text>
                  </Box>
                </PotSum>
                {pot - betsSum && board.some(card => card) ? (
                  <Flex pos="absolute" left="50%" bottom={0} transform="translate(-50%, 200%)" gap="1vh">
                    <PotChipStack
                      value={mainPotChipsValue}
                      pos="relative"
                      isCash={table.type === 'CASH'}
                    >
                      <Text as="div" fontSize="inherit">
                        <Text as="span" color="blue.300" fontSize="inherit">
                          Main:
                        </Text>{' '}
                        {formatFn(mainPotChipsValue)}
                      </Text>
                    </PotChipStack>
                    {sidePots
                      .filter(sidepot => sidepot.pot)
                      .map((sidePot, i) =>
                        sidePotChipsValues[i] ? (
                          <PotChipStack
                            key={sidePot.key}
                            value={sidePotChipsValues[i]}
                            isCash={table.type === 'CASH'}
                            pos="relative"
                          >
                            <Text as="div" fontSize="1.7vh">
                              <Text as="span" color="green.300" fontSize="1.7vh">
                                Side:
                              </Text>{' '}
                              {formatFn(sidePotChipsValues[i])}
                            </Text>
                          </PotChipStack>
                        ) : null
                      )}
                  </Flex>
                ) : null}
              </>
            ) : null}
          </Box>
        </GreenPartOfTable>
      </GrayBorderOfTable>
    </Flex>

    // </Box>
  )
}
