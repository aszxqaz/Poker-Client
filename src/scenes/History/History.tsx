import { Box, Button, ButtonProps, Flex, Grid, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import {
  RiArrowLeftCircleFill,
  RiArrowRightCircleFill,
  RiPauseFill,
  RiPlayFill,
  RiRepeatFill,
  RiRewindMiniFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'
import { useSearchParams } from 'react-router-dom'
import { Table } from '../../components/Table/Table'
import { useCombination } from '../../hooks/useCombination'
import { useInterval } from '../../hooks/useInterval'
import { getCombination } from '../../utils/combination'
import { useReplayerReducer } from './useReplayerReducer'

export const TableHistory = () => {
  const [params] = useSearchParams()
  const tableId = params.get('id') as string

  const { state, dispatch } = useReplayerReducer(parseInt(tableId))
  const [isPlay, setIsPlay] = useState(false)

  const nextRoundHand = useRef(state.rounds[state.roundIndex + 1]?.hand)
  const curRoundHand = useRef(state.table.round.hand)
  const stateRef = useRef(state)
  const intervalRef = useRef(0)
  const isPlayRef = useRef(false)

  useEffect(() => {
    nextRoundHand.current = state.rounds[state.roundIndex + 1]?.hand
  }, [state.roundIndex])

  useEffect(() => {
    isPlayRef.current = isPlay
  }, [isPlay])

  const currentRoundIndex = () => state.roundIndex

  const { start, stop, isToStart } = useInterval(
    () => {
      dispatch({
        type: 'STEP_FORWARD',
      })
      // setIsPlay(false)
    },
    500,
    () => {
      return nextRoundHand.current !== curRoundHand.current
    }
  )

  // useEffect(() => {
  //   let interval: number = 0

  //   if (isPlay) {
  //     console.log('play')
  //     intervalRef.current = setInterval(() => {
  //       console.log(currentRoundIndex() + 1)
  //       if (
  //         currentRoundIndex() + 1 in state.rounds &&
  //         state.rounds[currentRoundIndex() + 1].hand === currentHand.current
  //       ) {
  //         dispatch({
  //           type: 'STEP_FORWARD',
  //         })
  //       } else {
  //         setIsPlay(false)
  //         clearInterval(intervalRef.current)
  //       }
  //     }, 1000)
  //   }

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [isPlay])

  const {
    isNextHandAvailable,
    isPrevHandAvailable,
    isStepBackAvailable,
    isStepForwardAvailable,
    isToBeginAvailable,
    isToEndAvailable,
    roundIndex,
    rounds,
  } = state

  const { combination } = useCombination(state.table.round)

  return (
    <Flex flexGrow={1} justifyContent="center">
      <Table table={state.table} isReplay={true} mt="25vh" />
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        p="2vh"
      >
        <VStack alignItems="flex-start" gap="1rem" flexBasis="30%">
          <Text fontSize="2.5vh" ml="2rem" userSelect="none">
            {combination}
          </Text>
          <Grid gap="1vh" flexBasis="30%" templateColumns="1fr 1fr 1fr 1fr">
            <ReplayButton
              isDisabled={!isToBeginAvailable}
              onClick={() => {
                dispatch({
                  type: 'TO_BEGIN',
                })
              }}
            >
              <RiSkipBackFill fontSize="3vh" />
            </ReplayButton>
            <ReplayButton
              isDisabled={!isPrevHandAvailable}
              onClick={() => {
                dispatch({
                  type: 'PREV_HAND',
                })
              }}
            >
              <RiRewindMiniFill fontSize="4vh" />
            </ReplayButton>
            <ReplayButton
              isDisabled={!isNextHandAvailable}
              onClick={() => {
                dispatch({
                  type: 'NEXT_HAND',
                })
              }}
            >
              <RiRewindMiniFill fontSize="4vh" style={{ transform: 'rotate(180deg)' }} />
            </ReplayButton>
            <ReplayButton
              isDisabled={!isToEndAvailable}
              onClick={() => {
                dispatch({
                  type: 'TO_END',
                })
              }}
            >
              <RiSkipForwardFill fontSize="3vh" />
            </ReplayButton>
          </Grid>
        </VStack>
        <Grid gap="1vh" alignItems="center" flexBasis="30%" templateColumns="1fr 1.5fr 1fr" autoRows="6vh">
          <ReplayButton
            isDisabled={!isStepBackAvailable}
            onClick={() => {
              dispatch({
                type: 'STEP_BACK',
              })
            }}
          >
            <RiArrowLeftCircleFill fontSize="4vh" />
          </ReplayButton>
          <ReplayButton
            p="4vh 5vh"
            onClick={() => {
              curRoundHand.current = state.table.round.hand
              dispatch({
                type: 'TO_HAND_START',
              })
              isToStart ? stop() : start()
            }}
          >
            {state.table.round.hand !== state.rounds[state.roundIndex + 1]?.hand ? (
              <RiRepeatFill fontSize="6vh" style={{ transform: 'rotateY(180deg)' }} />
            ) : isToStart ? (
              <RiPauseFill fontSize="7vh" />
            ) : (
              <RiPlayFill fontSize="7vh" />
            )}
          </ReplayButton>
          <ReplayButton
            isDisabled={!isStepForwardAvailable}
            onClick={() => {
              dispatch({
                type: 'STEP_FORWARD',
              })
            }}
          >
            <RiArrowRightCircleFill fontSize="4vh" />
          </ReplayButton>
        </Grid>
      </Flex>
    </Flex>
  )
}

const ReplayButton: React.FC<PropsWithChildren & ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <Button _hover={{ transform: 'scale(1.1)' }} p="2vh 5vh" {...buttonProps}>
      <Box>{children}</Box>
    </Button>
  )
}
