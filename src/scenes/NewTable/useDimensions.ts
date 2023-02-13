import { AspectRatio, Box, Center, useDimensions as useChakraDimensions } from '@chakra-ui/react'
import { useState } from 'react'

export const useDimensions = () => {
  const dimensions = useChakraDimensions({ current: document.documentElement }, true)

  const screenWidth = dimensions?.marginBox.width || 0
  const screenHeight = dimensions?.marginBox.height || 0
  const base = screenWidth && screenHeight && screenHeight > screenWidth * 1.2 ? screenHeight : screenWidth

  let isPortrait = false
  let height = 0,
    width = 0

  if (screenHeight && screenWidth)
    if (base === screenHeight) {
      isPortrait = true
      height = 0.8 * screenHeight
      width = screenWidth < 800 ? Math.max(0.6 * screenWidth, height / 2) : height / 2

      // if (isPortrait && height > width * 0.5) {
      //   height = width * 2
      // }
    } else {
      width = 0.8 * screenWidth
      height = 0.5 * width
      if (height > 0.6 * screenHeight) {
        height = 0.6 * screenHeight
        width = 2 * height
      }
    }

  if (isPortrait && width > screenWidth * 0.95) {
    width = screenWidth * 0.95
    height = 2 * width
  }

  // const [tableRect, setTableRect] = useState({ width, height })

  const changeTableRect = (height: number) => {
    // setTableRect({
    //   height,
    //   width: height / 2
    // })
  }

  return { tableRect : { width, height }, changeTableRect, screenWidth, screenHeight, isPortrait }
}
