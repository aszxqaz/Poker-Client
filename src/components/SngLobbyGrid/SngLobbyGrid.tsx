import { Box, Container, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Tourney } from '../../types'
import { formatBalance } from '../../utils/format'
import { getTourneyState } from '../../utils/getLevelInfo'
import { SpringIn } from '../Animation/SpringIn'
import { Fallback } from '../Fallback/Fallback'
import { LobbyContainer } from '../Lobby/Container'
import { LobbyGridBody } from '../LobbyGrid/LobbyGrid'
import { SngActionsDialog } from './SngActionsDialog'
import { SngLobbyFilter } from './SngFilter'
import { SngInfoModal } from './SngInfoModal'
import { TourneyHeaderGrid } from './TourneyHeaderGrid'
import { useSngLobby } from './useSngLobby'

type SngLobbyGridProps = {
  games?: Tourney[]
}

export const SngLobbyGrid: React.FC<SngLobbyGridProps> = ({}) => {
  const {
    clickedTourneyId,
    setClickedTourneyId,
    clickedTourney,
    selectedTourneyId,
    setSelectedTourneyId,
    selectedTourney,
    isTourneyRegistered,
    tourneys,
    username,
    join,
    unjoin,
    isEnoughFunds,
    isActionable,
  } = useSngLobby()

  const [filtered, setFiltered] = useState(tourneys)

  useEffect(() => {
    if (!filtered.length && tourneys.length) setFiltered(tourneys)
  }, [tourneys])

  const { onOpen: onDialogOpen, onClose: onDialogClose, isOpen: isDialogOpen } = useDisclosure()
  const { onClose: onInfoClose, onOpen: onInfoOpen, isOpen: isInfoOpen } = useDisclosure()

  const pointerPos = useRef({ left: 0, top: 0 })

  if (!tourneys.length) return <Fallback h="65vh" />

  return (
    <SpringIn direction="to-right">
      <LobbyContainer>
        <SngLobbyFilter tourneys={tourneys} setFiltered={setFiltered} />
        <br />
        <Box
          borderTopWidth="2px"
          borderBottomWidth="2px"
          borderLeftWidth="2px"
          borderRightWidth="2px"
          borderColor="hsl(220, 26%, 28%)"
        >
          <TourneyHeaderGrid setFiltered={setFiltered} />
          <LobbyGridBody>
            {filtered.map(tourney => {
              const { id, buyin, tableSize, name, prizes, speed, entries, state, placings } = tourney
              const isRegistered = entries.includes(username)

              return (
                <Grid
                  key={id}
                  templateColumns="1fr 1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.7fr"
                  justifyItems="center"
                  padding="1em 0.75em"
                  onClick={e => {
                    setClickedTourneyId(id)
                    pointerPos.current = {
                      left: e.clientX - document.documentElement.clientWidth / 2,
                      top: e.clientY - document.documentElement.clientHeight / 2,
                    }
                    onDialogOpen()
                  }}
                  w="100%"
                  borderBottom="1px solid var(--chakra-colors-gray-700)"
                  cursor="pointer"
                  userSelect="none"
                  backgroundColor={id === clickedTourneyId ? 'hsl(260, 26%, 20%)' : undefined}
                  bgColor={entries.length ? 'rgb(255 255 255 / 4%)' : undefined}
                  sx={
                    isRegistered
                      ? {
                          ':not(:hover)': {
                            bgColor: 'hsl(120deg 90% 50% / 5%)',
                          },
                          ':hover': {
                            // bgColor: 'hsl(120deg 90% 80% / 5%)',
                          },
                        }
                      : {
                          ':hover': {
                            bgColor: 'hsl(220, 26%, 15%)',
                          },
                        }
                  }
                >
                  <GridItem>{getTourneyState(state)}</GridItem>
                  <GridItem>{name}</GridItem>
                  <GridItem>NLH</GridItem>
                  <GridItem>{formatBalance(buyin)}</GridItem>
                  <GridItem>{speed[0].toUpperCase() + speed.substring(1).toLowerCase()}</GridItem>
                  <GridItem>{formatBalance(prizes.reduce((a, b) => a + b, 0))}</GridItem>
                  <GridItem>
                    {entries.length} / {tableSize}
                  </GridItem>
                </Grid>
              )
            })}
          </LobbyGridBody>
        </Box>
        {clickedTourney ? (
          <SngActionsDialog
            isOpen={isDialogOpen}
            isDisabled={!isTourneyRegistered && !isEnoughFunds}
            isActionable={isActionable}
            onClose={() => {
              setSelectedTourneyId(null)
              setClickedTourneyId(null)
              onDialogClose()
            }}
            isRegistered={isTourneyRegistered}
            onInfoOpen={() => {
              setSelectedTourneyId(clickedTourneyId)
              setClickedTourneyId(null)
              onDialogClose()
              onInfoOpen()
            }}
            onRegister={() => {
              if (isEnoughFunds) {
                join(clickedTourneyId!)
                setClickedTourneyId(null)
                onDialogClose()
              }
            }}
            onUnregister={() => {
              if (isTourneyRegistered && isActionable) {
                unjoin(clickedTourneyId!)
                setClickedTourneyId(null)
                onDialogClose()
              }
            }}
            pointerPos={pointerPos}
          />
        ) : null}

        {selectedTourney ? (
          <SngInfoModal
            isOpen={isInfoOpen}
            onClose={onInfoClose}
            tourney={selectedTourney}
            onOverlayClick={() => {
              setSelectedTourneyId(null)
              onInfoClose()
            }}
          />
        ) : null}
      </LobbyContainer>
    </SpringIn>
  )
}
