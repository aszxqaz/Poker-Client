import { Flex, FlexProps, Spinner } from '@chakra-ui/react'

export const Fallback: React.FC<FlexProps> = (props) => {
  return (
    <Flex {...props}>
      <Spinner size="xl" m="auto" />
    </Flex>
  )
}
