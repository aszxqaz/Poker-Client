import { Container, ContainerProps } from '@chakra-ui/react'

export const LobbyContainer: React.FC<ContainerProps> = props => (
  <Container maxW="90rem" m="auto" p="clamp(0.2rem, 2vw - 0.3rem, 1rem)" {...props}>
    {props.children}
  </Container>
)
