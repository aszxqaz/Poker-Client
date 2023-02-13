import { BoxProps, Box, Flex, FlexProps, Center } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const FixedHeightBox: React.FC<PropsWithChildren<BoxProps>> = ({ children, ...rest }) => (
  <Box minH="1.6rem" {...rest}>
    {children}
  </Box>
)

export const FixedHeightInputErrorBox: React.FC<PropsWithChildren & FlexProps> = ({ children, ...rest }) => (
  <FixedHeightBox pl="0.2rem" as={Flex} h="1.5rem" alignItems="flex-start" {...rest}>
    {children}
  </FixedHeightBox>
)

export const FixedHeightAuthErrorBox: React.FC<PropsWithChildren & FlexProps> = ({ children, ...rest }) => (
  <FixedHeightBox as={Center} h="3rem" {...rest}>
    {children}
  </FixedHeightBox>
)
