import { BoxProps, Box, Image, Flex, Center, FlexProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const TableWithBewel: React.FC<PropsWithChildren & BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      w="95vh"
      height="101.52vh"
      borderRadius="full"
      bgImage="radial-gradient(hsl(0deg, 0%, 0%), hsl(120deg 8% 17%) 90%)"
      boxShadow="0px 50px 20px 0px rgb(0 0 0 / 27%)"
      transform="rotateX(-60deg)"
      transformOrigin="top"
      {...rest}
    >
      {children}
    </Box>
  )
}

export const GreenPartOfTable = () => (
  <Box
    pos="absolute"
    left={0}
    top={0}
    w="100%"
    h="95vh"
    borderRadius="inherit"
    bgImage="radial-gradient(hsl(120deg 100% 35% / 80%), hsl(120deg, 100%, 20%) 80%);"
    boxShadow="inset -3px -20px 100px 0px rgb(0 0 0 / 50%);"
  ></Box>
)

export const TableLogo: React.FC<PropsWithChildren & FlexProps> = ({ children, ...rest }) => (
  <Flex
    flexDir="column"
    alignItems="center"
    textAlign="center"
    pos="absolute"
    left="50%"
    top="24%"
    transform="translate(-50%, -50%)"
    w="30vh"
    {...rest}
  >
    <Image
      src="/assets/logo.svg"
      display="block"
      w="full"
      h="auto"
      filter="invert(100%) sepia(0%) saturate(7499%) hue-rotate(104deg) brightness(105%) contrast(100%) opacity(0.3)"
    />
    {children}
  </Flex>
)
