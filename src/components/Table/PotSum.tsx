import { BoxProps, Center } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type PotSumProps = {} & BoxProps

export const PotSum: React.FC<PropsWithChildren<PotSumProps>> = ({ children, ...rest }) => {
  return (
    <Center
      // pos="absolute"
      // fontSize="2.4vh"
      fontWeight="medium"
      backdropFilter="blur(10px)"
      background="rgb(0,0,0,55%)"
      borderRadius="md"
      px="0.7em"
      pt="0.22em"
      pb="0.10em"
      userSelect="none"
      w="max-content"
      {...rest}
    >
      {children}
    </Center>
  )
}
