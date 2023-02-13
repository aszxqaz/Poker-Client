import { Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const AuthWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container as="section" m="auto" w="90%" maxW="30rem">
      {children}
    </Container>
  )
}
