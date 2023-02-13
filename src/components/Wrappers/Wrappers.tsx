import { Box, BoxProps } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export const WrapperMedium: React.FC<PropsWithChildren<BoxProps>> = ({ children, ...rest }) => {
  return <Box maxW="30rem" w="100%" {...rest}>
    {children}
  </Box>
}