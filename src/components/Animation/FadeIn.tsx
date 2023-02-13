import { m } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

type FadeInProps = {}

export const FadeIn: React.FC<PropsWithChildren & FadeInProps> = ({ children }) => {
  return (
    <m.div
      animate={{ opacity: 1 }}
      style={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </m.div>
  )
}
