import { Progress } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTablesContext } from '../../contexts'

type ProgressbarProps = {
  timestamp: number
  timeout: number
  onTimeoutLeft: () => void
}

export const Progressbar: React.FC<ProgressbarProps> = ({ timestamp, timeout, onTimeoutLeft }) => {
  
  const [value, setValue] = useState(0)
  const intervalRef = useRef<ReturnType<Window['setInterval']>>(0)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const diff = (Date.now() - timestamp) / 1000
      const val = (diff / timeout) * 100
      setValue(val)
    }, 500)

    return () => {
      clearInterval(intervalRef.current)
      setValue(0)
    }
  }, [timestamp, timeout])

  useEffect(() => {
    if(value > 100) {
      clearInterval(intervalRef.current)
      onTimeoutLeft()
    }
  }, [value])

  return (

    <Progress
      pos="absolute"
      inset={0}
      transform="translateY(calc(-100% - 5px))"
      colorScheme="orange"
      size="xs"
      value={value}
      borderRadius="md"
      sx={{
        '>div': {
          transition: 'width 0.5s linear !important',
        },
      }}
    />
  )
}

// import { Box, Progress } from '@chakra-ui/react'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import { motion } from 'framer-motion'

// type ProgressbarProps = {
//   timestamp: number
//   timeout: number
// }

// export const Progressbar: React.FC<ProgressbarProps> = ({ timestamp, timeout }) => {
//   // const getInitialPercent = () => {
//   //   const diff = (Date.now() - timestamp) / 1000
//   //   const val = (diff / timeout) * 100
//   //   return val
//   // }
//   // const [duration, setDuration] = useState(((timestamp + timeout * 1000) - Date.now()) / 1000)

//   // const intervalRef = useRef<number>(0)

//   // useEffect(() => {
//   //   intervalRef.current = setInterval(() => {
//   // const diff = (Date.now() - timestamp) / 1000
//   // const val = (diff / timeout) * 100
//   // setValue(val)
//   //   }, 1000)

//   //   return () => {
//   //     clearInterval(intervalRef.current)
//   //   }
//   // }, [timestamp, timeout])

  // const now = Date.now()
  // const timeLeftFromTimestamp = (now - timestamp) / 1000
  // const totalTime = (timestamp + timeout * 1000 - now) / 1000

  // const initialScale = timeLeftFromTimestamp / totalTime
  // const timeLeft = totalTime - timeLeftFromTimestamp

//   return (
//     <Box
//       as={motion.div}
//       pos="absolute"
//       left={0}
//       right={0}
//       bottom="100%"
//       bgColor="whiteAlpha.100"
//       h="1vh"
//       transform="translateY(-1vh)"
//       borderRadius="md"
//     >
//       <motion.div
//         style={{
//           borderRadius: 'inherit',
//           position: 'absolute',
//           inset: 0,
//           transformOrigin: '0% 50%',
//           width: "100%",
//           willChange: 'background-color'
//         }}
//         animate={{ scaleX: 1, opacity: 1, backgroundColor: "hsl(0, 100%, 50%)" }}
//         initial={{ scaleX: initialScale, opacity: 0.5, backgroundColor: "hsl(153, 100%, 50%)" }}
//         transition={{ duration: timeLeft, ease: 'linear' }}
//       />
//     </Box>
//   )
// }

// export const Progressbar2: React.FC<ProgressbarProps> = ({ timestamp, timeout }) => {
//   const getInitialPercent = () => {
//     const diff = (Date.now() - timestamp) / 1000
//     const val = (diff / timeout) * 100
//     return val
//   }
//   const [duration, setDuration] = useState(((timestamp + timeout * 1000) - Date.now()) / 1000)

//   const intervalRef = useRef<number>(0)

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//   const diff = (Date.now() - timestamp) / 1000
//   const val = (diff / timeout) * 100
//   setValue(val)
//     }, 1000)

//     return () => {
//       clearInterval(intervalRef.current)
//     }
//   }, [timestamp, timeout])

//   return
