import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  Tab,
  TabList,
  TabProps,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { PropsWithChildren, ReactNode, useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'
import { useTablesContext } from '../../contexts/Tables/TablesContext'
import {
  avatarBalanceMobile,
  mainScreenMobile,
  mobileDrawerContainer,
  menulistMobile,
  mobileDrawerMenu,
  menuTabMobile,
  openMenuMobile,
  mobileDrawerMenyOverlay,
} from '../../styles/mobileStyles'

type HeaderProps = {
  avatar: string | undefined
  username: ReactNode
  balance: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ avatar, balance, username }) => {
  const { activeTables } = useTablesContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Flex
      // animate={{ transform: 'translateX(0)' }}
      mb="1.6vh"
      maxW="111vh"
      mx="auto"
      alignItems="center"
      userSelect="none"
    >
      <Button
        display="none"
        variant="ghost"
        sx={{ ...openMenuMobile }}
        onClick={() => {
          setIsMenuOpen(true)
        }}
      >
        <RiMenuFill />
      </Button>
      <TabList
        w="full"
        as={Flex}
        flexDir="column"
        sx={{
          '@media screen and (max-width: 768px)': {
            display: 'contents',
          },
        }}
      >
        <Box
          transform={`translateX(${isMenuOpen ? 0 : '-100%'})`}
          sx={{ ...mobileDrawerMenyOverlay, opacity: `${isMenuOpen ? 1 : 0}` }}
          onClick={e => {
            setIsMenuOpen(false)
          }}
        />
        <Flex
          sx={{ ...mobileDrawerMenu(isMenuOpen) }}
          onClick={e => {
            e.stopPropagation()
          }}
          // border="1px solid red"
          alignItems="center"
          w="full"
        >
          <Flex gap="1.6vh" py="0.8vh" pr="3.18vh" alignItems="center" sx={{ ...avatarBalanceMobile }}>
            <Avatar
              as="div"
              src={avatar}
              w="6.4vh"
              h="6.4vh"
              borderColor="green.300"
              borderWidth={1}
              boxShadow="0 0 5px var(--chakra-colors-green-300)"
            />
            <VStack>
              <Text color="green.300">{username}</Text>
              <Text color="blue.300">{balance}</Text>
            </VStack>
          </Flex>
          <MenuList
            items={['Cash', 'Sit-n-Go', 'Tournaments', 'My Account', 'Cashier', 'Table']}
            onMenuClose={() => {
              setIsMenuOpen(false)
            }}
          />
        </Flex>

        <Box>
          {activeTables.length ? (
            <Flex gap="1.6vh" h="3.5vh" pl="1.6vh" justifyContent="flex-start" flexWrap="wrap">
              {activeTables.map(table => (
                <GameTab key={table.id}>{table.name}</GameTab>
              ))}
            </Flex>
          ) : null}
        </Box>
      </TabList>
    </Flex>
  )
}

type MenuListProps = {
  items: string[]
  onMenuClose: () => void
} & GridProps

const MenuList: React.FC<MenuListProps> = ({ items, onMenuClose, ...gridProps }) => (
  <Grid
    // border="1px solid white"
    flexGrow={1}
    gap="1.6vh"
    h="4.8vh"
    w="full"
    templateColumns={`repeat(${items.length}, 1fr)`}
    sx={{ ...menulistMobile }}
    {...gridProps}
  >
    {items.map(item => (
      <MenuTab key={item} onClick={onMenuClose}>
        {item}
      </MenuTab>
    ))}
  </Grid>
)

export const MenuTab: React.FC<PropsWithChildren<TabProps>> = ({ children, ...rest }) => {
  const tabSx = {
    '-webkit-tap-highlight-color': 'transparent',
    color: 'gray.500',
    ':hover:not([aria-selected="true"])': {
      color: 'gray.300',
    },
    '&[aria-selected="true"]': {
      boxShadow: '0 0 10px rgb(190 227 248 / 50%)',
      transform: 'scale(1.05, 1.05)',
      outline: 'none',
      border: 'none',
      willChange: 'transform',
    },
    ...menuTabMobile,
  }
  return (
    <Tab sx={tabSx} w="100%" backgroundColor="whiteAlpha.50" fontSize="1em" px="1em" py="0.8em" {...rest}>
      {children}
    </Tab>
  )
}

export const GameTab: React.FC<PropsWithChildren<TabProps>> = ({ children }) => {
  const tabSx = {
    color: 'whiteAlpha.700',
    ':hover:not([aria-selected="true"])': {
      color: 'gray.300',
    },
    '&[aria-selected="true"]': {
      boxShadow: '0 0 10px rgb(183 255 178 / 50%)',
      transform: 'scale(1.05, 1.05)',
      outline: 'none',
      border: 'none',
      willChange: 'transform',
      bgColor: '#b7ffb2',
      color: 'gray.700',
    },
    //#53ff53
  }
  return (
    <Tab
      sx={tabSx}
      backgroundColor="whiteAlpha.200"
      fontSize="1.6vh"
      px="1.6vh"
      py="0.8vh"
      minW="fit-content"
      borderRadius="md"
      flex={0}
    >
      {children}
    </Tab>
  )
}
