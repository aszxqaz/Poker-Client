import { TabList, Tabs, Tab, TabPanel, TabPanels, Flex, Box, Center, CenterProps } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls, useMotionValue } from 'framer-motion'
import { getInitialState, scrollableReducer } from './scrollableReducer'
import { useDimensions } from '../../scenes/NewTable/useDimensions'

const tabs = ['Cash', 'Sit-n-Go', 'Scheduled', 'Spin-n-Go']

type ScrollableProps = {
  widthPx: number
} & CenterProps

export const Scrollable: React.FC<PropsWithChildren<ScrollableProps>> = ({ children, widthPx, ...rest }) => {
  const [state, dispatch] = useReducer(scrollableReducer, getInitialState(tabs, 2))
  const [isBlocked, setIsBlocked] = useState(false)

  const controls = useAnimationControls()
  const x = useMotionValue(0)
  const { current: vars } = useRef({
    isBlocked: false,
  })

  console.log(`isBlocked: ${isBlocked}`)
  console.log(`isBlockedRef: ${vars.isBlocked}`)

  const { current: pointers } = useRef({
    initial: 0,
    last: 0,
    translateX: 0,
    offset: 0,
  })

  const sideStyle = {
    color: 'transparent',
    sx: {
      WebkitBackgroundClip: 'text',
    },
  }

  const rightStyle = {
    ...sideStyle,
    bgImage: 'linear-gradient(to right, rgb(255 255 255 / 50%), rgb(255 255 255 / 50%))',
    bgSize: '160px',
  }

  const leftStyle = {
    ...sideStyle,
    bgImage: 'linear-gradient(to right, rgb(255 255 255 / 50%), rgb(255 255 255 / 50%))',
  }

  const centerStyle = {
    color: 'white',
  }

  const defaultStyle = {
    color: 'whiteAlpha.900',
  }

  const itemWidth = widthPx / 2

  const next = async () => {
    if (isBlocked) return
    vars.isBlocked = true
    setIsBlocked(true)
    await controls.start({ x: -itemWidth })
    console.log('next')
    vars.isBlocked = false
    setIsBlocked(false)
    dispatch({ type: 'NEXT' })
    controls.start({
      x: 0,
      transition: {
        duration: 0,
      },
    })
  }

  const back = async () => {
    if (isBlocked) return
    vars.isBlocked = true
    setIsBlocked(true)
    await controls.start({ x: itemWidth })
    vars.isBlocked = false
    setIsBlocked(false)
    dispatch({ type: 'PREV' })
    controls.start({
      x: 0,
      transition: {
        duration: 0,
      },
    })
  }

  return (
    <Tabs
      index={state.tabIndex}
      display="flex"
      flexDir="column"
      flexGrow={1}
      variant="soft-rounded"
      colorScheme="green"
      sx={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      
      <Center
        pos="relative"
        width={itemWidth * 2}
        overflow="hidden"
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor="whiteAlpha.200"
        {...rest}
      >
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          animate={controls}
          drag={!isBlocked && 'x'}
          dragConstraints={
            {
              // left: 320
            }
          }
          // dragElastic={0}
          dragSnapToOrigin={true}
          onDragEnd={async (event, info) => {
            const delta = info.point.x - pointers.initial
            const _ = info.offset
            if (Math.abs(info.offset.x) < 100) {
              return
            }

            let int = Math.trunc(info.offset.x / 240)
            let offset = info.offset.x < 0 ? int - 1 : int + 1
            const to = offset * itemWidth
            await controls.start({
              x: to,
            })

            dispatch({ type: offset > 0 ? 'PREV' : 'NEXT', count: Math.abs(offset) })

            controls.start({
              x: 0,
              transition: {
                duration: 0,
              },
            })
          }}
          onDragStart={(event, info) => {
            pointers.initial = info.point.x
          }}
        >
          {state.tabs.map((item, i, arr) => {
            const middleIndex = Math.trunc(arr.length / 2)
            const style =
              i === middleIndex
                ? centerStyle
                : i === middleIndex - 1
                ? leftStyle
                : i === middleIndex + 1
                ? rightStyle
                : defaultStyle
            return (
              <Box
                {...style}
                w={itemWidth}
                key={item.key}
                p="1em 2em"
                textAlign="center"
                borderLeft="1px solid rgb(255 255 255 / 10%)"
                onClick={i === middleIndex - 1 ? back : i === middleIndex + 1 ? next : undefined}
              >
                {item.title}
              </Box>
            )
          })}
        </motion.div>
        <Box
          pos="absolute"
          w={itemWidth}
          left="50%"
          top="0"
          bottom="0"
          transform={'translateX(-50%)'}
          bgColor="rgb(255 255 255 / 20%)"
          pointerEvents="none"
        />
      </Center>
      {children}
    </Tabs>
  )
}
