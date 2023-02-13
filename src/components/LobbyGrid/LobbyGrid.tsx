import { Box, Grid, GridProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { scrollbarSx } from '../../styles/scrollbar'

export const LobbyGridHeader: React.FC<PropsWithChildren & GridProps> = ({ children, ...gridProps }) => (
  <Grid
    w="calc(100% - 0.7em)"
    justifyItems="center"
    padding="1em 0.75em"
    bgColor="hsl(220, 26%, 17%)"
    color="gray.400"
    textTransform="uppercase"
    fontFamily="var(--chakra-fonts-heading)"
    fontWeight="var(--chakra-fontWeights-bold)"
    letterSpacing="var(--chakra-letterSpacings-wider)"
    borderBottomWidth="1px"
    borderBottomColor="whiteAlpha.300"
    boxShadow="0.7em 0 0 0 hsl(220, 26%, 17%)"
    {...gridProps}
  >
    {children}
  </Grid>
)

export const LobbyGridBody: React.FC<PropsWithChildren> = ({ children }) => (
  <Box
    overflowY="scroll"
    w="100%"
    sx={scrollbarSx}
    height="fit-content"
    maxH="60vh"
  >
    {children}
  </Box>
)
