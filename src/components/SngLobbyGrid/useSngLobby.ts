import { useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { useSngSocketEmitters } from '../../socket/emitters'

export const useSngLobby = () => {
  const { tourneys, join, unjoin } = useSngSocketEmitters()
  const { user, balance } = useUserContext()

  const [selectedTourneyId, setSelectedTourneyId] = useState<number | null>(null)
  const [clickedTourneyId, setClickedTourneyId] = useState<number | null>(null)

  const clickedTourney = tourneys.find(game => game.id === clickedTourneyId)
  const selectedTourney = tourneys.find(game => game.id === selectedTourneyId)

  const isJoined = !!clickedTourney?.entries.includes(user.username)
  const isEnoughFunds = clickedTourney && clickedTourney.buyin <= balance.usd
  const isActionable = clickedTourney && clickedTourney.state === 'REGISTERING'

  return {
    selectedTourneyId,
    setSelectedTourneyId,
    selectedTourney,
    clickedTourneyId,
    setClickedTourneyId,
    clickedTourney,
    isTourneyRegistered: isJoined,
    tourneys,
    username: user?.username,
    join,
    unjoin,
    isEnoughFunds,
    isActionable
  }
}
