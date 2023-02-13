import { Box, BoxProps, Flex, Image, Center, Divider, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { RoundPlayer } from '../../types/round'
import { formatBalance } from '../../utils/format'

type PlateProps = {
  username: string
  chips: number
  reversed?: boolean
  isPortrait?: boolean
  isCash?: boolean
  avatar: string | undefined
} & BoxProps

export const Plate: React.FC<PropsWithChildren<PlateProps>> = ({
  reversed,
  avatar,
  isCash = true,
  isPortrait,
  chips,
  username,
  children,
  ...rest
}) => {
  return (
    <Flex
      alignItems="center"
      color="gray.400"
      border={isPortrait ? 'none' : '0.002vh solid rgb(255 255 255 / 50%)'}
      borderRadius="md"
      boxShadow="sm"
      {...rest}
      bgColor={isPortrait ? 'transparent' : 'gray.700'}
      // overflow="hidden"
      flexDir={isPortrait ? 'column' : reversed ? 'row-reverse' : 'row'}
    >
      <Center
        h="clamp(2.5rem, 8vw, 5rem)"
        w="clamp(2.5rem, 8vw, 5rem)"
        borderLeftRadius={!reversed ? 'md' : undefined}
        borderRightRadius={reversed ? 'md' : undefined}
        overflow="hidden"
      >
        <Image src={avatar} />
      </Center>
      <Flex
        minW={isPortrait ? '8rem' : '18vh'}
        flexDir="column"
        alignItems="center"
        gap="0.3vh"
        userSelect="none"
        fontWeight="500"
        pos="relative"
        px={isPortrait ? '0.1rem' : '2vh'}
        bgColor={isPortrait ? 'gray.700' : 'transparent'}
        border={isPortrait ? '0.002vh solid rgb(255 255 255 / 50%)' : 'none'}
        fontSize="clamp(0.85rem, 0.6vw + 0.7rem, 1.25rem)"
      >
        <Box fontWeight="600" whiteSpace="nowrap">
          {username}
        </Box>
        <Box
          w="80%"
          h="1px"
          bgImage="linear-gradient(to right, rgb(255 255 255 / 0%), rgb(255 255 255 / 100%) 50%, rgb(255 255 255 / 0%))"
        />
        <Box fontWeight="600">{isCash ? formatBalance(chips) : chips.toLocaleString()}</Box>
      </Flex>
      {children}
    </Flex>
  )
}

//     box-shadow: var(--chakra-shadows-sm);
