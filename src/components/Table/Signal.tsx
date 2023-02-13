import { Center } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { PropsWithChildren, useEffect } from 'react'



export const Signal: React.FC<PropsWithChildren<{fadeOut?: boolean}>> = ({ children, fadeOut }) => {
  const controls = useAnimation()

  useEffect(() => {
    if(fadeOut) {
      controls.start({opacity: 0 })
    }
  }, [fadeOut])

  return (
    <motion.div animate={controls} transition={{ duration: 1, ease: 'backOut', delay: 0.3 }}>
      <Center
        pos="absolute"
        inset="0"
        bgColor="whiteAlpha.400"
        borderRadius="md"
        fontSize="3vh"
        fontWeight="900"
        letterSpacing="4px"
        color="gray.700"
        backdropFilter="blur(5px) grayscale(1)"
      >
        {children}
      </Center>
    </motion.div>
  )
}
