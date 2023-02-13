import { Box, Center } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Fallback } from '../../components/Fallback/Fallback'
import { SngInfo } from './SngInfo'
import { useTablesContext, useUserContext } from '../../contexts'
import { useSngInfoListener } from '../../socket/listeners'
import NewWindow from 'react-new-window'
import { Tourney } from '../../types'
import InnerHTML from 'dangerously-set-html-content'

type TourneyInfoProps = {
  tourney: Tourney | undefined
}

export const TourneyInfo = ({ tourney }: TourneyInfoProps) => {
  const { user } = useUserContext()

  if (!tourney) return <Fallback h="100vh" />

  return (
    <Center h="100vh" w="100vw">
      <Box w="90%" userSelect="none">
        <SngInfo tourney={tourney} />
      </Box>
      <InnerHTML
        html={`
      <script>
      window.addEventListener('beforeunload', () => {
            window.opener.__callback();
          });

      </script>
      `}
      />
    </Center>
  )
}
