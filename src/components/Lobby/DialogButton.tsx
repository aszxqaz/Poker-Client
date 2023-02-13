import { Button, ButtonProps } from '@chakra-ui/react'

export const DialogButton: React.FC<ButtonProps> = props => (
  <Button
    variant="ghost"
    colorScheme="blue"
    w="9em"
    p="0"
    h="3em"
    fontSize="1em"
    isDisabled={false}
    {...props}
  >
    {props.children}
  </Button>
)
