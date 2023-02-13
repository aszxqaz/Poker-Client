import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
  Heading,
  Text,
  Box,
  Flex,
  VStack,
  Center,
  Button,
  Divider,
  Grid,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Tourney } from '../../types'
import { formatBalance } from '../../utils/format'

type CashInfoModalProps = {
  game: Tourney
  onClose: () => void
} & Omit<ModalProps, 'children'>

export const CashInfoModal: React.FC<CashInfoModalProps> = ({ game, isOpen, onClose, ...rest }) => {
  const { buyin: _buyin, id, name, placings, prizes, speed, state } = game

  const prizePool = formatBalance(prizes.reduce((a, b) => a + b, 0))
  // const entries = players.length
  const buyin = formatBalance(_buyin)

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} {...rest}>
      <ModalOverlay background="blackAlpha.300"></ModalOverlay>
      <ModalContent maxW="none" w="initial">
        <ModalCloseButton size="lg" />
        <ModalBody p="2rem" color="whiteAlpha.800">
          <Box as="header" textAlign="center" pb="2rem">
            <Heading fontSize="2xl" letterSpacing="1.5px" mb="1rem">
              {`${name.toUpperCase()} (${speed})`}
            </Heading>
            <Text>No Limit Hold'em SNG</Text>
          </Box>
          <Divider />
          <Flex gap="3rem">
            <Flex
              py="2rem"
              sx={{
                '>div:not(:first-child):not(:last-child)': { paddingInline: '2rem' },
                '>div:first-child': { paddingRight: '2rem' },
                '>div:not(:last-child)': { borderRightWidth: '1px', borderRightColor: 'inherit' },
                '>div:last-child': { paddingLeft: '2rem' },
              }}
            >
              <VStack>
                <Box color="gray.400">Status</Box>
                <Box fontSize="xl" color="green.100" opacity={0.8}>
                  Registering
                </Box>
              </VStack>
              <VStack>
                <Box color="gray.400">Prize pool</Box>
                <Box fontSize="xl" color="green.100" opacity={0.8}>
                  {prizePool}
                </Box>
              </VStack>
              <VStack>
                <Box color="gray.400">Entries</Box>
                <Box fontSize="xl" color="green.100" opacity={0.8}>
                  {/* {entries} */}
                </Box>
              </VStack>
              <VStack>
                <Box color="gray.400">Buy-in</Box>
                <Box fontSize="xl" color="green.100" opacity={0.8}>
                  {buyin}
                </Box>
              </VStack>
            </Flex>
            <Center>
              <Button colorScheme="green">Register</Button>
            </Center>
          </Flex>
          <Divider />
          <Grid templateColumns="0.7fr 1fr 1fr" gap="2rem" mt="2rem" h="20rem">
            <Box
              sx={{ '>div': { py: '0.5rem' } }}
              p="0.5rem 1rem"
              fontSize="sm"
              backgroundColor="blackAlpha.300"
              borderRadius="md"
              boxShadow="inset 0 0 50px rgb(0 0 0 / 5%)"
              border="1px solid rgba(255 255 255 / 5%)"
            >
              <Flex justifyContent="space-between">
                <Box>Prize Pool:</Box>
                <Box>{prizePool}</Box>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Box>Entries:</Box>
                {/* <Box>{entries}</Box> */}
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Box>Places paid:</Box>
                <Box>{prizes.length}</Box>
              </Flex>
              <Divider />
              {prizes.map((prize, i) => (
                <Flex justifyContent="space-between">
                  <Box>{i + 1}</Box>
                  <Box>{formatBalance(prize)}</Box>
                </Flex>
              ))}
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
