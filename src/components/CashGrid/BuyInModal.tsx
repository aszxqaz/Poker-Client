import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider'
import { PropsWithChildren, useState } from 'react'
import { CashTable } from '../../types'
import { formatBalance } from '../../utils/format'

type BuyinModalProps = {
  balance: number
  table: CashTable
  onJoinTable: (tableId: number, buyin: number) => void
} & Omit<ModalProps, 'children'>

export const BuyinModal: React.FC<PropsWithChildren<BuyinModalProps>> = ({
  balance,
  table,
  onJoinTable,
  ...rest
}) => {
  const { bb, stack } = table
  const min = (stack * bb) / 2
  const max = balance > min ? Math.min(stack * bb, balance) : stack * bb
  const [buyin, setBuyin] = useState<number>((min + max) / 2)
  const [floatValue, setFloatValue] = useState(0)
  const [editMode, setEditMode] = useState(false)

  const [isTooMuch, setIsTooMuch] = useState(false)

  const isNotEnough = balance < min

  const sliderMarkStyle = {
    bottom: 0,
    transform: 'translateY(150%)',
  }

  return (
    <Modal isCentered={true} {...rest}>
      <ModalOverlay />
      <ModalContent textAlign="center" p="2rem" pt="1rem" userSelect="none">
        <ModalHeader mb="1rem">
          <Heading size="lg">Choose your buy-in</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack>
            <Box mb="1rem" fontSize="lg">
              Your balance:{' '}
              <Box as="span" fontSize="xl" fontWeight="600" color="blue.300">
                {formatBalance(balance)}
              </Box>
            </Box>
            <VStack mb="2rem !important">
              <Box>Buy-in</Box>
              {/* <Box fontSize="2xl" color="green.300">{formatBalance(buyin)}</Box> */}
              <Box position="relative" w="60%">
                <Flex
                  alignItems="center"
                  justifyContent="flex-start"
                  fontSize="2xl"
                  fontWeight="600"
                  pl="2vh"
                  color="green.300"
                  position="absolute"
                  inset={0}
                  opacity={isNotEnough ? 0.4 : 1}
                >
                  $
                </Flex>
                <Input
                  isDisabled={isNotEnough}
                  fontSize="2xl"
                  fontWeight="600"
                  letterSpacing="wider"
                  color="green.300"
                  h="5vh"
                  px="1.5vh"
                  type="number"
                  pl="4vh"
                  w="100%"
                  value={editMode ? floatValue : formatBalance(buyin).slice(1)}
                  onChange={e => {
                    setEditMode(true)
                    const num = parseFloat(e.target.value)
                    if (num * 100 > max) {
                      setBuyin(max)
                      setEditMode(false)
                    } else {
                      setFloatValue(Math.trunc(num * 100 + 0.1) / 100)
                      setBuyin(Math.trunc(num * 100 + 0.1))
                    }
                  }}
                />
              </Box>
            </VStack>
            <Box w="100%" px="1rem">
              <Slider
                focusThumbOnChange={false}
                isDisabled={isNotEnough}
                aria-label="slider-ex-4"
                value={buyin}
                min={min}
                max={max}
                step={1}
                defaultValue={buyin}
                size="lg"
                flexGrow={1}
                onChange={val => {
                  setEditMode(false)
                  setBuyin(val)
                }}
              >
                <SliderTrack bg="red.100">
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={5}>
                  {/* <Box color="tomato" as={MdGraphicEq} /> */}
                  <img src="assets/images/logo-sm.svg" />
                </SliderThumb>
              </Slider>
              <Flex justifyContent="space-between" mx="-2vh">
                <Box>{formatBalance(min)}</Box>
                <Box>{formatBalance((min + max) / 2)}</Box>
                <Box>{formatBalance(max)}</Box>
              </Flex>
            </Box>
          </VStack>

          {/* <FormControl>
          <FormLabel>First name</FormLabel>
          <Input
            ref={rest.initialFocusRef as LegacyRef<HTMLInputElement> | undefined}
            placeholder="First name"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Last name</FormLabel>
          <Input placeholder="Last name" />
        </FormControl> */}
        </ModalBody>
        {buyin < min ? (
          <Text fontSize="xl" color="red.400" my="1rem">
            Buy-in should be minimum {formatBalance(min)}.
          </Text>
        ) : balance < min ? (
          <Text fontSize="xl" color="red.400" my="1rem">
            Not enough funds to make a buy-in.
            <br />
            Visit cashier to make a deposit.
          </Text>
        ) : balance < bb * stack ? (
          <Text fontSize="xl" color="red.400" my="1rem">
            Lack of funds to make a full buy-in.
            <br />
            You can visit cashier to make a deposit.
          </Text>
        ) : null}
        <ModalFooter as={Flex} w="100%" gap="7%">
          <Button flexBasis="40%" onClick={rest.onClose}>
            Cancel
          </Button>
          <Button
            flexBasis="60%"
            colorScheme="green"
            onClick={() => {
              onJoinTable(table.id, buyin)
            }}
            isDisabled={isNotEnough || isTooMuch || buyin < min}
          >
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
