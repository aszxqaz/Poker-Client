import { Box, BoxProps, Grid, Text, Flex } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { useTablesContext } from '../../contexts'
import { useUserContext } from '../../contexts/UserContext'
import { GameplayTable, Round } from '../../types'
import { getCombination } from '../../utils/combination'
import { isEqualUsername } from '../../utils/equal'
import { formatBalance } from '../../utils/format'
import { ButtonChip } from './ButtonChip'
import { Card } from './Card'
import { ChipStack } from './ChipStack'
import { LANDSCAPE_CHIPS_STACK_POSITIONS } from './config/chips'
import { PLATES_POSITIONS } from './config/plates'
import { getRoundData } from './getRoundData'
import { getSidePotData } from './getSidePotData'
import { GreenPartOfTable, TableLogo, TableWithBewel } from './misc'
import { Plate } from './Plate'
import { PotChipStack } from './PotChipStack'
import { PotSum } from './PotSum'
import { Progressbar } from './Progressbar'
import { Signal } from './Signal'
import { TableName } from './TableName'

type TableProps = {
  table: GameplayTable
  isReplay?: boolean
}

export const Table: React.FC<PropsWithChildren<TableProps & BoxProps>> = ({
  table,
  isReplay,
  children,
  ...boxProps
}) => {
  const user = useUserContext()
  const { timeoutLeft } = useTablesContext()

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

  const [boardWithPlaceholders, setBoardWithPlaceholders] = useState<Round['board']>([])

  // useEffect(() => {
  //   if (allinShowdown) {
  //     if (board.length) {
  //       switch (board.length) {
  //         case 3: {
  //           setBoardWithPlaceholders([...board, null])
  //           break
  //         }
  //         case 4: {
  //           setBoardWithPlaceholders([...board, null])
  //           break
  //         }
  //       }
  //     } else {
  //       setBoardWithPlaceholders([null, null, null])
  //     }
  //   }
  // }, [allinShowdown, board])

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

  const { mainPot, sidePots, mainPotChipsValue, sidePotChipsValues } = getSidePotData(table.round)

  return (
    <Box pos="relative" userSelect="none" {...boxProps}>
      {import.meta.env.DEV ? (
        <Box pos="fixed" left="-30vh" top="20vh">
          <Text pos="absolute" top="0">
            {' '}
            {`turnIndex: ${turnIndex}`}
            <br />
            {`allinShowdown: ${allinShowdown}`} <br />
            {`isLast: ${isLast}`} <br />
          </Text>
        </Box>
      ) : null}
      <TableWithBewel>
        <GreenPartOfTable />
      </TableWithBewel>
      <TableLogo>
        <TableName table={table} pos="absolute" top="100%" />
      </TableLogo>
      {/* <Box pos="absolute" top="43%" left="50%" transform="translateX(-50%)"></Box> */}
      {children}
      {/* ------ */}
      {/* PLATES */}
      {/* ------ */}
      {players.map((player, i, arr) => {
        const pos = PLATES_POSITIONS[(arr.length - 1) as keyof typeof PLATES_POSITIONS][i]
        const opacity = player.isOut || player.isSitOut ? 0.5 : 1
        const showdownPlayer = showdown.find(isEqualUsername(player))
        const hand =
          player.username === user.user?.username ? cards : showdownPlayer ? showdownPlayer.cards : []
        return (
          <Plate
            key={`plate-${player.username}`}
            opacity={opacity}
            username={player.username}
            chips={player.chips}
            isCash={type === 'CASH'}
            avatar={table.players.find(isEqualUsername(player))?.avatar}
            // avatar={' '}
            pos="absolute"
            bgColor={
              winners.find(winner => winner.username === player.username && winner.isHighlighted)
                ? '#687c2da1'
                : 'gray.700'
            }
            borderColor={player.isTurn && !isReplay ? 'rgba(255,255,255,20%)' : undefined}
            borderWidth={player.isTurn && !isReplay ? '3px' : undefined}
            {...pos}
            // transform="translate(-50%, -50%)"
            reversed={'reversed' in pos && pos.reversed}
          >
            <>
              {prev &&
              prev.username === player.username &&
              !['BET', 'ALL IN', 'CHECK'].includes(prev.type) ? (
                <Signal fadeOut={true}>{prev.type}</Signal>
              ) : null}
              {prev && prev.username === player.username && ['BET', 'ALL IN', 'CHECK'].includes(prev.type) ? (
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
                  top={parseInt(pos.top) > 20 ? '103%' : undefined}
                  bottom={parseInt(pos.top) <= 20 ? '103%' : undefined}
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
            </>
          </Plate>
        )
      })}
      {/* ------------ */}
      {/* CHIPS STACKS */}
      {/* ------------ */}
      <AnimatePresence>
        {players.map((player, i, arr) => {
          const pos = LANDSCAPE_CHIPS_STACK_POSITIONS[arr.length as keyof typeof LANDSCAPE_CHIPS_STACK_POSITIONS][i]
          return (
            <React.Fragment key={`chips-stack${player.username}`}>
              <AnimatePresence>
                {player.bet ? (
                  <motion.div
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ position: 'absolute', ...pos }}
                    exit={{
                      left: '46%',
                      top: '25%',
                      opacity: 0.4,
                    }}
                  >
                    <ChipStack
                      value={player.bet}
                      reversed={'reversed' in pos ? pos.reversed : false}
                      isCash={table.type === 'CASH'}
                    >
                      {formatFn(player.bet)}
                    </ChipStack>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {i === buttonIndex ? <ButtonChip key={`button-${player.username}`} pos="absolute" /> : null}
            </React.Fragment>
          )
        })}
      </AnimatePresence>
      {/* ------------ */}
      {/*     BOARD    */}
      {/* ------------ */}
      <Box pos="absolute" minH="4.5vh" zIndex={2} top="16%" left="50%" transform="translateX(-50%)">
        <Grid pos="relative" gridTemplateColumns="repeat(5, 1fr)" columnGap="0.8vh">
          {table.round &&
            (false ? boardWithPlaceholders : board).map((card, i) => (
              <Card card={card} key={`${card !== null ? card[0] : i}${card !== null ? card[1] : i}`} />
            ))}
        </Grid>
        {/* ------------ */}
        {/*    POT SUM   */}
        {/* ------------ */}
        {pot ? (
          <>
            <PotSum
              left="50%"
              top={!board.length ? '240%' : 0}
              transform="translate(-50%, -120%)"
              fontSize="2vh"
            >
              <Box color="green.300" fontSize={!board.length ? '2.5vh' : undefined}>
                Pot:{' '}
                <Text as="span" color="white" fontSize={!board.length ? '2.5vh' : undefined}>
                  {formatFn(pot)}
                </Text>
              </Box>
            </PotSum>
            {pot - betsSum && board.some(card => card) ? (
              <Flex pos="absolute" left="50%" bottom={0} transform="translate(-50%, 5vh)" gap="1vh">
                <PotChipStack value={mainPotChipsValue} pos="relative" isCash={table.type === 'CASH'}>
                  <Text as="div" fontSize="1.7vh">
                    <Text as="span" color="blue.300" fontSize="1.7vh">
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
    </Box>
  )
}
