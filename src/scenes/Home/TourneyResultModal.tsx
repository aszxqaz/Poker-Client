import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import tombSvg from '../../assets/images/tombstone.svg'
import trophySvg from '../../assets/images/trophy.svg'
import { useTabsContext } from '../../contexts'
import { usePlayAgainSngSocketEmitter } from '../../socket/emitters'
import { TourneyResult } from '../../types'
import { formatBalance } from '../../utils/format'
import { getNumeralEnding } from '../../utils/getNumeralEnding'

type TourneyResultModalProps = {
  result: TourneyResult
  onModalClose: () => void
}

export const TourneyResultModal: React.FC<TourneyResultModalProps> = ({ result, onModalClose }) => {
  const { place, tourney, amount, entries } = result
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { playAgain } = usePlayAgainSngSocketEmitter()
  const { setTabIndex } = useTabsContext()

  const won = typeof amount === 'number' && amount > 0

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        onModalClose()
        // onClose()
      }}
      isCentered
      autoFocus={false}
    >
      <ModalOverlay background="blackAlpha.300"></ModalOverlay>
      <ModalContent maxW="60rem" w="initial">
        <ModalCloseButton size="lg" />
        <ModalBody as={VStack} p="2rem" gap="2vh" color="whiteAlpha.800" userSelect="none" textAlign="center">
          <Heading fontSize="3vh" letterSpacing="1.5px" mb="2vh">
            {won ? 'Congratulations!' : 'Finished'}
          </Heading>
          <Box mb="2vh !important" pointerEvents="none">
            <Image
              src={won ? trophySvg : tombSvg}
              w="20vh"
              filter={
                won
                  ? 'drop-shadow(0px 0px 50px rgb(255 255 0 / 10%));'
                  : 'drop-shadow(7px 7px 4px rgb(0 0 0 / 50%));'
              }
            />
          </Box>
          <Box>
            <Text fontSize="2.2vh">
              You have finished {getNumeralEnding(place)} out of {entries}.
            </Text>
            {won ? (
              <Text fontSize="2.2vh">
                {' '}
                Won:{' '}
                <Text as="span" fontSize="2.4vh" fontWeight="600" color="blue.300">
                  {formatBalance(amount)}
                </Text>
              </Text>
            ) : null}
          </Box>
          <ModalFooter as={Flex} w="100%" gap="7%">
            <Button
              flexBasis="40%"
              onClick={() => {
                onModalClose()
                // onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              flexBasis="60%"
              colorScheme="green"
              onClick={() => {
                playAgain(tourney.id)
                onModalClose()
                // onClose()
                setTabIndex(1)
              }}
            >
              Play again
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
