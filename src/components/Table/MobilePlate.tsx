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

const borderGradient =
  'linear-gradient(to right bottom, rgb(255 255 255 / 80%), rgb(160 160 160) 25%, rgb(60 60 60) 50%, rgb(160 160 160) 75%, rgb(255 255 255 / 80%))'

export const MobilePlate: React.FC<PropsWithChildren<PlateProps>> = ({
  reversed,
  avatar,
  isCash = true,
  isPortrait,
  chips,
  username,
  children,
  ...rest
}) => {
  // const avatarSize = 'clamp(3rem, 4.8vw + 1.8rem, 6rem)'
  const avatarSize = 'clamp(2.5rem, 3.3vw + 1.7rem, 5rem)'
  return (
      <Flex
        flexDir={isPortrait ? 'column' : reversed ? 'row-reverse' : 'row'}
        isolation="isolate"
        pos="relative"
        alignItems="center"
        color="gray.400"
        // border={isPortrait ? 'none' : '0.002vh solid rgb(255 255 255 / 50%)'}
        borderRadius="md"
        boxShadow="sm"
        sx={{
          '::after': {
            content: '""',
            pos: 'absolute',
            inset: '-1.1px',
            zIndex: -1,
            // w: 'calc(100% + 2px)',
            // h: 'clamp(3rem, 3.2vw + 2.2rem, 5rem)',
            bgImage: borderGradient,
            borderRadius: 'md',
            // bgSize: 'clamp(3rem, 3.2vw + 2.2rem, 5rem) clamp(3rem, 3.2vw + 2.2rem, 5rem)'
          },
        }}
        {...rest}
        // bgColor={isPortrait ? 'transparent' : 'gray.700'}
        // overflow="hidden"
      >
        <Center
          pos={isPortrait ? 'absolute' : 'relative'}
          top="0"
          left={isPortrait ? '50%' : undefined}
          transform={isPortrait ? 'translate(-50%, -80%)' : 'translateX(0%)'}
          w={avatarSize}
          h={avatarSize}
          borderRadius={isPortrait ? 'full' : 'md'}
          bgImage={isPortrait ? borderGradient : undefined}
          overflow={isPortrait ? 'hidden' : undefined}
        >
          <Center
            borderRadius="inherit"
            borderRightRadius={!isPortrait && !reversed ? 0 : undefined}
            borderLeftRadius={!isPortrait && reversed ? 0 : undefined}
            // borderRight={!isPortrait && !reversed ? '1px solid rgb(255 255 255 / 50%)' : undefined}
            h={`calc(100%${isPortrait ? ' - 2px' : ''})`}
            w={`calc(100%${isPortrait ? ' - 2px' : ''})`}
            overflow="hidden"
            pos="relative"
            display="content"
          >
            <Box pos="absolute" boxShadow="inset -1px 1px 20px 4px rgb(0 0 0 / 90%)" inset="0" />
            <Image src={avatar} w="100%" h="100%" />
          </Center>
        </Center>
        <Center
          borderRadius="md"
          pos="relative"
          borderLeft="md"
          // fontSize="clamp(0.65rem, 1vw + 0.4rem, 1.25rem);"
        >
          {/* <Box
            display={isPortrait ? 'block' : 'none'}
            // bgImage={borderGradient}
            borderRadius="inherit"
            borderLeft={!isPortrait ? 'none' : undefined}
            // borderLeftRadius="md"
            pos="absolute"
            w="calc(100% + 2px)"
            h="calc(100% + 2px)"
          /> */}
          <Flex
            h={!isPortrait ? avatarSize : undefined}
            py={isPortrait ? '0.5em' : undefined}
            minW="9em"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            userSelect="none"
            fontWeight="500"
            pos="relative"
            px="0.2em"
            // py="0.2em"
            bgImage="linear-gradient(105deg, black, #1b1b1b)"
            // border={isPortrait ? '0.002vh solid rgb(255 255 255 / 50%)' : 'none'}
            borderRadius="inherit"
            borderLeftRadius={!isPortrait && !reversed ? 0 : undefined}
            borderRightRadius={!isPortrait && reversed ? 0 : undefined}
          >
            <Box
              fontWeight="500"
              whiteSpace="nowrap"
              fontSize={
                username.length > 12 || (username.length > 10 && (username.match(/[A-Z]/g) || []).length > 5)
                  ? '0.8em'
                  : undefined
              }
              lineHeight={1}
              mb="0.4em"
            >
              {username}
            </Box>
            <Box
              w="5em"
              h="1.3px"
              bgImage="linear-gradient(to right, rgb(255 255 255 / 0%), rgb(255 255 255 / 100%) 50%, rgb(255 255 255 / 0%))"
              mb="0.6em"
            />
            <Box fontWeight="600" fontSize="1.05em" lineHeight={1} color="green.200">
              {isCash ? formatBalance(chips) : chips.toLocaleString().replace(',', ' ')}
            </Box>
          </Flex>
        </Center>

        {children}
      </Flex>
  )
}

//     box-shadow: var(--chakra-shadows-sm);
