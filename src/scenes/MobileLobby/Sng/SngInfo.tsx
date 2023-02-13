import { Box, Divider, Flex, Heading, VStack } from '@chakra-ui/react'
import { Tourney } from '../../../types'
import { formatBalance } from '../../../utils/format'

type SngInfoProps = {
  tourney: Tourney
}

export const SngInfo: React.FC<SngInfoProps> = ({ tourney }) => {
  const {
    buyin: _buyin,
    tableSize,
    id,
    name,
    placings,
    entries,
    prizes,
    speed,
    tables,
    state,
    chips,
    startedAt,
  } = tourney

  const prizePool = formatBalance(prizes.reduce((a, b) => a + b, 0))
  const buyin = formatBalance(_buyin)

  return (
    <VStack>
      <Heading fontSize="1.5em" letterSpacing="0.1em" mb="1em">
        {`${name.toUpperCase()} (${speed})`}
      </Heading>
      <Box
        sx={{ '>div': { py: '0.5rem' } }}
        p="0.5rem 1rem"
        backgroundColor="blackAlpha.300"
        borderRadius="md"
        boxShadow="inset 0 0 50px rgb(0 0 0 / 5%)"
        border="1px solid rgba(255 255 255 / 10%)"
        w="full"
      >
        <Flex justifyContent="space-between">
          <Box>Prize Pool:</Box>
          <Box>{prizePool}</Box>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between">
          <Box>Entries:</Box>
          <Box>{entries.length}</Box>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between">
          <Box>Places paid:</Box>
          <Box>{prizes.length}</Box>
        </Flex>
        <Divider />
        <Box overflow="auto">
          {prizes.map((prize, i) => (
            <Flex justifyContent="space-between">
              <Box>{i + 1}</Box>
              <Box>{formatBalance(prize)}</Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </VStack>
  )
}
