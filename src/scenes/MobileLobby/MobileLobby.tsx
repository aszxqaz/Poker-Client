import { TabPanels, TabPanel, Container, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Scrollable } from '../../components/Lobby/Scrollable'
import { useDimensions } from '../NewTable/useDimensions'
import { CashMobileLobby } from './Cash/CashMobileLobby'
import { SngMobileLobby } from './Sng/SngMobileLobby'

export const MobileLobby = () => {
  const { screenWidth } = useDimensions()
  const [buyinIndex, setBuyinIndex] = useState(0)

  return (
    <Scrollable widthPx={Math.min(screenWidth, 500)} fontSize="1.5em">
      <TabPanels as={Flex} flexGrow={1}>
        <TabPanel flexGrow={1}>
          {/* <CashMobileLobby /> */}
        </TabPanel>
        <TabPanel flexGrow={1}>
          <SngMobileLobby />
        </TabPanel>
        <TabPanel>
          <p>Scheduled</p>
        </TabPanel>
        <TabPanel>
          <p>Spin</p>
        </TabPanel>
      </TabPanels>
    </Scrollable>
  )
}
