import { Box, Button, ButtonProps, Flex, Grid, HStack, Image, Input, Text } from '@chakra-ui/react'
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider'
import { PropsWithChildren, useEffect, useState } from 'react'
import { RiAddFill, RiSubtractFill } from 'react-icons/ri'
import { formatBalance } from '../../utils/format'
import logoSmall from '../../assets/images/logo-sm.svg'

type ControlsProps = {
  tableId: number
  heroBet: number
  bb: number
  chips: number
  pot: number
  toCall: number
  bets: number[]
  minbet: number
  maxbet: number
  isOn?: boolean
  isCash?: boolean
  onTakeAction: (val: number) => void
}

export const Controls: React.FC<PropsWithChildren<ControlsProps>> = ({
  onTakeAction,
  minbet,
  pot,
  children,
  maxbet,
  heroBet,
  chips,
  bets,
  bb,
  tableId,
  isCash = true,
  isOn = false,
  toCall,
}) => {
  const [bet, setBet] = useState(minbet)
  useEffect(() => {
    setBet(minbet)
  }, [minbet])
  const [editMode, setEditMode] = useState(false)
  const [stringValue, setStringValue] = useState('')

  const formatAmount = (amount: number) => (isCash ? formatBalance(amount) : amount.toLocaleString())

  const betsFiltered = bets.filter(_ => _)

  const getPercentFromPot = (p: number) => Math.trunc(((betsFiltered.length ? minbet : 0) + pot) * p)

  return (
    <>
      {!isOn ? (
        <Text fontSize="3vh" alignSelf="center" flexGrow={1} textAlign="center">
          Waiting for opponents...
        </Text>
      ) : (
        <Flex
          flexDir="column"
          gap="clamp(0.3rem, 0.5vw + 0.1rem, 0.6rem)"
          ml="auto"
          fontSize="clamp(0.75rem, 0.8vw + 0.5rem, 1.25rem)"
          color="whiteAlpha.800"
          // m="0 0.8vh 0.4vh 0"
        >
          {import.meta.env.DEV ? (
            <Text position="absolute" right="0" top="-100%">
              minbet: {minbet} <br />
              maxbet: {maxbet} <br />
              toCall: {toCall} <br />
              heroBet: {heroBet} <br />
              bets: {bets} <br />
            </Text>
          ) : null}
          <Flex gap="0.4em" justifyContent="flex-end">
            <ControlsSmallestButton
              isDisabled={getPercentFromPot(0.25) < minbet || getPercentFromPot(0.25) > maxbet}
              onClick={() => {
                setBet(getPercentFromPot(0.25))
              }}
            >
              25% Pot
            </ControlsSmallestButton>
            <ControlsSmallestButton
              isDisabled={getPercentFromPot(0.5) < minbet || getPercentFromPot(0.5) > maxbet}
              onClick={() => {
                setBet(getPercentFromPot(0.5))
              }}
            >
              50% Pot
            </ControlsSmallestButton>
            <ControlsSmallestButton
              isDisabled={getPercentFromPot(0.75) < minbet || getPercentFromPot(0.75) > maxbet}
              onClick={() => {
                setBet(getPercentFromPot(0.75))
              }}
            >
              75% Pot
            </ControlsSmallestButton>
            <ControlsSmallestButton
              isDisabled={getPercentFromPot(1) > maxbet}
              onClick={() => {
                setBet(getPercentFromPot(1))
              }}
            >
              100% Pot
            </ControlsSmallestButton>
          </Flex>
          <Flex gap="0.4em" justifyContent="flex-end">
            <ControlsSmallestButton
              letterSpacing="2px"
              isDisabled={Math.max(...betsFiltered, 0) * 2.5 > maxbet || !betsFiltered.length}
              onClick={() => {
                setBet(Math.max(...betsFiltered, 0) * 2.5)
              }}
            >
              2.5X
            </ControlsSmallestButton>
            <ControlsSmallestButton
              letterSpacing="2px"
              isDisabled={Math.max(...betsFiltered, 0) * 3 > maxbet || !betsFiltered.length}
              onClick={() => {
                setBet(Math.max(...betsFiltered, 0) * 3)
              }}
            >
              3X
            </ControlsSmallestButton>
            <ControlsSmallestButton
              letterSpacing="2px"
              isDisabled={Math.max(...betsFiltered, 0) * 4 > maxbet || !betsFiltered.length}
              onClick={() => {
                setBet(Math.max(...betsFiltered, 0) * 4)
              }}
            >
              4X
            </ControlsSmallestButton>
            <ControlsSmallestButton
              onClick={() => {
                setBet(maxbet)
              }}
              isDisabled={bet === maxbet}
            >
              All-in
            </ControlsSmallestButton>
          </Flex>
          {/****** SLIDER *******/}
          <Flex alignItems="center" gap="0.5em" w="100%">
            <Box flexBasis="50%">
              <Input
                isDisabled={chips <= toCall || chips <= minbet}
                type="number"
                fontSize="1.2em"
                h="2.5em"
                px="1em"
                // py="1em"
                w="100%"
                value={editMode ? stringValue : isCash ? formatBalance(bet).slice(1) : bet}
                onChange={e => {
                  setEditMode(true)
                  const val = e.target.value
                  if (val === '') {
                    setStringValue('')
                    return
                  }
                  const num = isCash ? parseFloat(val) * 100 : parseInt(val)
                  if (num > maxbet) {
                    setBet(maxbet)
                    setEditMode(false)
                    return
                  }
                  if (num < minbet) {
                    setStringValue(val)
                    return
                  }

                  setStringValue(val)
                  setBet(Math.trunc(num + 0.1))
                }}
              />
            </Box>
            <HStack w="full">
              <Box flexBasis="2em">
                <Button
                  isDisabled={bet === minbet}
                  onClick={() => {
                    setBet(bet => {
                      if (bet - bb / 2 < minbet) return minbet
                      return bet - bb / 2
                    })
                  }}
                  p={0}
                  w="3em"
                  h="3em"
                  variant="solid"
                  fontSize="1em"
                  minW={0}
                  bgColor="#00ffff3b"
                >
                  <RiSubtractFill fontSize="2em" />
                </Button>
              </Box>
              <Box flexGrow={1} px="1em">
                <Slider
                  isDisabled={chips <= toCall || minbet >= chips + heroBet}
                  value={bet}
                  min={minbet}
                  max={maxbet}
                  step={1}
                  onChange={val => {
                    setBet(val)
                    setEditMode(false)
                  }}
                  focusThumbOnChange={false}
                  aria-label="slider-ex-4"
                  defaultValue={30}
                  size="lg"
                  flexGrow={1}
                >
                  <SliderTrack bg="red.100">
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <SliderThumb boxSize={5}>
                    {/* <Box color="tomato" as={MdGraphicEq} /> */}
                    <Image src={logoSmall} />
                  </SliderThumb>
                </Slider>
              </Box>
              <Box flexBasis="2em">
                <Button
                  isDisabled={bet === maxbet}
                  onClick={() => {
                    setBet(bet => {
                      if (bet + bb / 2 > chips) return chips
                      return bet + bb / 2
                    })
                  }}
                  p={0}
                  w="3em"
                  h="3em"
                  minW="0"
                  fontSize="1em"

                  variant="solid"
                  bgColor="#00ffff3b"
                >
                  <RiAddFill fontSize="2em" />
                </Button>
              </Box>
            </HStack>
          </Flex>
          {/******* MAIN CONTROLS ********/}
          <Grid templateColumns="repeat(3, 1fr)" gap="0.8vh" justifyContent="flex-end" maxW="70vh">
            <Button
              onClick={() => {
                onTakeAction(-1)
              }}
              h="3em"
              minW="initial"
              w="initial"
              p="0"
              fontSize="1.5em"
              bgColor="#852d2d75"
            >
              Fold
            </Button>
            <Button
              onClick={() => {
                onTakeAction(0)
              }}
              h="3em"
              minW="initial"
              w="initial"
              p="0"
              fontSize="1.5em"
              bgColor="#00ffff3b"
            >
              {!toCall ? 'Check' : `Call ${formatAmount(toCall)}`}
            </Button>
            {
              // minbet > 0 &&
              toCall < chips && heroBet + toCall < minbet ? (
                <Button
                  onClick={() => {
                    onTakeAction(bet)
                  }}
                  h="3em"
                  minW="initial"
                  w="initial"
                  p="0"
                  fontSize="1.5em"
                  whiteSpace="normal"
                >
                  {bet === maxbet
                    ? // chips <= toCall || chips <= minbet ||
                      'All-in'
                    : bets.filter(bet => bet > 0).length
                    ? `Raise to ${formatAmount(bet)}`
                    : `Bet ${formatAmount(bet)}`}
                </Button>
              ) : null
            }
          </Grid>
        </Flex>
      )}
    </>
  )
}

export const ControlsSmallestButton: React.FC<PropsWithChildren & ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button w="7em" h="2.2em" fontSize="0.8em" p="0" bgColor="#00ffff3b" {...rest}>
      {children}
    </Button>
  )
}

export const SizingsSlider = () => {
  return (
    <Flex alignItems="center" gap="0.5rem" w="70vh">
      <Box flexBasis="50%">
        <Input fontSize="2vh" h="5vh" px="1.5vh" w="100%" />
      </Box>
      <Box flexGrow={1} flexBasis="50%" px={5}>
        <Slider aria-label="slider-ex-4" defaultValue={30} size="lg" flexGrow={1}>
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            {/* <Box color="tomato" as={MdGraphicEq} /> */}
            <img src={logoSmall} />
          </SliderThumb>
        </Slider>
      </Box>
    </Flex>
  )
}
