import { HTMLMotionProps, motion, MotionStyle } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

type SpringInProps = {
  direction: 'to-left' | 'to-right'
  style?: MotionStyle
}

export const SpringIn: React.FC<PropsWithChildren & SpringInProps> = ({ children, direction, style }) => {
  return (
    <motion.div
      animate={{ x: 0 }}
      style={{ x: direction === 'to-right' ? '-70%' : '70%', ...style }}
      exit={{ x: direction === 'to-right' ? '70%' : '-70%' }}
      transition={{ type: 'spring', damping: 10, stiffness: 200, mass: 0.3 }}
    >
      {children}
    </motion.div>
  )
}