import { useRef, useEffect, useState } from 'react'

export function useInterval(
  callback: Function,
  delay: number,
  conditionToEnd: () => boolean
) {
  const savedCallback = useRef<Function>()

  const [isToStart, setIsToStart] = useState(false)

  const start = () => {
    setIsToStart(true)
  }

  const stop = () => {
    setIsToStart(false)
  }

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    let id = 0
    if (delay !== null && isToStart) {
      id = window.setInterval(() => {
        if (!conditionToEnd()) {
          savedCallback.current?.()
        } else {
          setIsToStart(false)
          clearInterval(id)
        }
      }, delay)
      return () => clearInterval(id)
    }
    if (!isToStart) {
      clearInterval(id)
    }
  }, [delay, isToStart, conditionToEnd])

  return {
    isToStart,
    start,
    stop,
  }
}
