import { Box, BoxProps, Center, Image } from '@chakra-ui/react'
import btnSvg from '../../assets/images/button.svg'

export const ButtonChip: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <Box transform="rotateX(45deg)" width="3.5vh" {...props} >
      <Image src={btnSvg} width="full" height="auto" display="block" />
      <Center pos="absolute" inset={0}>
        B
      </Center>
    </Box>
  )
}
