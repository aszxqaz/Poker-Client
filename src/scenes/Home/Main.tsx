import { Flex, TabPanel, TabPanelProps, TabPanels, Tabs } from '@chakra-ui/react'
import { Cashier } from '..'
import leather from '../../assets/images/textures/leather2.webp'
import { CashGrid } from '../../components/CashGrid/CashGrid'
import { SngLobbyGrid } from '../../components/SngLobbyGrid/SngLobbyGrid'
import { useTabsContext, useUserContext } from '../../contexts'
import {
  useActiveSocketListener,
  useCashSocketListeners,
  useSngSocketListener,
  useSocketConnectionListener,
  useTourneyResultsListener,
  useUserSocketListener,
} from '../../socket/listeners'
import { PingPongSocketConnection } from '../../socket/PingPongSocketConnection'
import { formatBalance } from '../../utils/format'
import { Gameplay } from '../Gameplay/Gameplay'
import { MobileLobby } from '../MobileLobby/MobileLobby'
import { Header } from './Header'
import { TourneyResultModal } from './TourneyResultModal'

type MainProps = {}

export const Main: React.FC<MainProps> = () => {
  const { balance, user } = useUserContext()
  const { setTabIndex, tabIndex, removeTable } = useTabsContext()
  const { activeTables, removeActiveTable } = useActiveSocketListener()
  const { removeResult, results } = useTourneyResultsListener()
  useCashSocketListeners()
  useSngSocketListener()
  useUserSocketListener()
  useSocketConnectionListener()

  return (
    <Flex
      // pos="fixed"
      flexGrow={1}
      left={0}
      right={0}
      top={0}
      bgImage={leather}
      bgSize="380px 380px"
      boxShadow="inset 0 0 10vh rgb(0 0 0 / 80%)"
    >
      <PingPongSocketConnection />
      <Tabs
        display="flex"
        flexDir="column"
        flexGrow={1}
        isLazy
        isFitted
        isManual
        variant="soft-rounded"
        index={tabIndex}
        onChange={setTabIndex}
      >
        <Header avatar={user?.avatar} username={user?.username || ''} balance={formatBalance(balance?.usd)} />
        <TabPanels display="flex" flexGrow={1}>
          {getTabPanels([
            <CashGrid key="CashGrid" />,
            <SngLobbyGrid key="SngLobbyGrid" />,
            <MobileLobby key="SimpleGrid" />,
            <p key="My Account">My Account</p>,
            <Cashier key="Cashier" />,
          ])}
          {activeTables.map(table => (
            <TabPanel key={table.id} p={0} display="flex" flexGrow={1}>
              <Gameplay table={table} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      {results.map(result => (
        <TourneyResultModal
          key={result.tourney.id}
          result={result}
          onModalClose={() => {
            removeResult(result.tourney.id)
            const table = activeTables.find(table => table.tourneyId === result.tourney.id)
            if (!table) return

            removeTable(table.id)
            removeActiveTable(table.id)
            const t = setTimeout(() => {
              clearTimeout(t)
            }, 200)
          }}
        />
      ))}
    </Flex>
  )
}

type MainTabPanelsProps = {
  items: JSX.Element[]
}

const StyledTabPanel: React.FC<TabPanelProps> = ({ children, ...props }) => {
  return (
    <TabPanel p="0" mx="auto" {...props}>
      {children}
    </TabPanel>
  )
}

const getTabPanels = (items: JSX.Element[]) =>
  items.map((item, i) => (
    <TabPanel display="flex" flexGrow={1} p="0" mx="auto" key={i}>
      {item}
    </TabPanel>
  ))
