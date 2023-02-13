import { Box, Button, Center, Divider, Flex, Grid, Heading, VStack, Text } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'
import { useUserContext } from '../../contexts'
import { scrollbarSx } from '../../styles/scrollbar'
import { Tourney } from '../../types'
import { formatBalance } from '../../utils/format'
import { getLevelInfo, getTourneyState } from '../../utils/getLevelInfo'

type SngInfoProps = {
  tourney: Tourney
}

export const SngInfo: React.FC<SngInfoProps> = ({ tourney }) => {
  const { user } = useUserContext()
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

  useEffect(() => {
    window.addEventListener('close', () => {
    })
  }, [])


  return (
    <>
      <Box as="header" textAlign="center" pb="2rem">
        <Heading fontSize="3xl" letterSpacing="1.5px" mb="1rem">
          {`${name.toUpperCase()} (${speed})`}
        </Heading>
        <Text>No Limit Hold'em SNG</Text>
      </Box>
      <Divider />
      <Flex gap="3rem">
        <Flex
          py="2rem"
          mx="auto"
          sx={{
            '>div:not(:first-child):not(:last-child)': { paddingInline: '2rem' },
            '>div:first-child': { paddingRight: '2rem' },
            '>div:not(:last-child)': { borderRightWidth: '1px', borderRightColor: 'inherit' },
            '>div:last-child': { paddingLeft: '2rem' },
          }}
          // w="100%"
        >
          <VStack>
            <Box color="gray.400">Status</Box>
            <Box fontSize="xl" color="green.100" opacity={0.8}>
              {getTourneyState(state)}
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
              {entries.length} of {tableSize}
            </Box>
          </VStack>
          <VStack>
            <Box color="gray.400">Buy-in</Box>
            <Box fontSize="xl" color="green.100" opacity={0.8}>
              {buyin}
            </Box>
          </VStack>
        </Flex>
        {state === 'REGISTERING' ? (
          <Center>
            {entries.includes(user.username) ? (
              <Button colorScheme="red">Unregister</Button>
            ) : (
              <Button colorScheme="green">Register</Button>
            )}
          </Center>
        ) : null}
      </Flex>
      <Divider />
      {/* <Grid templateColumns="0.25fr 0.4fr 0.35fr" gap="0.5rem" mt="2rem" h="20rem" w="100%" fontSize="sm"> */}
      <Flex gap="0.5rem" h="50vh" fontSize="sm" mt="2rem">
        <Box
          sx={{ '>div': { py: '0.5rem' } }}
          p="0.5rem 1rem"
          backgroundColor="blackAlpha.300"
          borderRadius="md"
          boxShadow="inset 0 0 50px rgb(0 0 0 / 5%)"
          border="1px solid rgba(255 255 255 / 10%)"
          flexBasis="25%"
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
        <Box
          flexBasis="40%"
          sx={{ '>div': { py: '0.5rem' }, ...scrollbarSx }}
          p="0.5rem 1rem"
          fontSize="sm"
          backgroundColor="blackAlpha.300"
          borderRadius="md"
          boxShadow="inset 0 0 50px rgb(0 0 0 / 5%)"
          border="1px solid rgba(255 255 255 / 10%)"
          overflow="auto"
        >
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Starting time:</Box>
            <Box>
              {typeof startedAt === 'number'
                ? new Date(startedAt).toLocaleString()
                : `When ${tableSize - entries.length} more players register`}
            </Box>
          </Grid>
          <Divider />
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Starting chips:</Box>
            <Box>{chips}</Box>
          </Grid>
          <Divider />
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Starting level:</Box>
            <Box>10 / 20</Box>
          </Grid>
          <Divider />
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Level duration:</Box>
            <Box>{getLevelInfo(speed)}</Box>
          </Grid>
          <Divider />
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Late registration:</Box>
            <Box>No</Box>
          </Grid>
          <Divider />
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Rebuys / Addon:</Box>
            <Box>No / No</Box>
          </Grid>
          <Divider />
          <Grid templateColumns="1fr 1fr" gap="1rem">
            <Box>Knockout Bounty:</Box>
            <Box>No</Box>
          </Grid>
          <Divider />
        </Box>
        <Box
          sx={{ ...scrollbarSx }}
          p="1rem 1rem"
          backgroundColor="blackAlpha.300"
          borderRadius="md"
          boxShadow="inset 0 0 50px rgb(0 0 0 / 5%)"
          border="1px solid rgba(255 255 255 / 10%)"
          flexBasis="35%"
          overflow="auto"
        >
          <Grid templateColumns="0.3fr 1.5fr 1fr" gap="1rem" mb="0.5rem">
            <Box>#</Box>
            <Box>Name</Box>
            <Box>Chips</Box>
          </Grid>
          <Divider />
          <Box>
            {tables
              .map(table => table.players)
              .flat(2)
              .sort((a, b) => b.chips - a.chips)
              .map((player, i, arr) => (
                <Fragment key={player.username}>
                  <Grid templateColumns="0.3fr 1.5fr 1fr" gap="1rem" mt="0.6rem" mb="0.5rem">
                    <Box>{i + 1}.</Box>
                    <Box>{player.username}</Box>
                    <Box>{player.chips.toLocaleString()}</Box>
                  </Grid>
                  <Divider />
                </Fragment>
              ))}
          </Box>
        </Box>
      </Flex>
    </>
  )
}
