import { Box, BoxProps, Table } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'
import { objectKeys } from '../../utils/objectKeys'
import { Chip } from './Chips'
import { chipsColors } from './config/chips'
import { PotSum } from './PotSum'

type PotChipsStackProps = {
  value: number
  reversed?: boolean
  isCash: boolean
} & BoxProps

export const PotChipStack: React.FC<PropsWithChildren<PotChipsStackProps>> = ({
  value,
  children,
  reversed,
  isCash,
  ...rest
}) => {
  const arr: number[] = []
  let val = value
  const values = objectKeys(chipsColors).reverse()
  values.forEach((key, i) => {
    const int = Math.trunc(val / key)
    val -= int * key
    arr.push(int)
  })

  const chips: JSX.Element[] = []

  const count = arr.reduce((a, b) => a + b, 0)
  const maxCountInStack = 5
  const stacksCount = Math.ceil(count / maxCountInStack)
  const startOffset = stacksCount * -50

  let yOffset = 0
  let k = 0
  arr.map((v, i) => {
    for (let j = 0; j < v; j++) {
      const column = Math.trunc(k / maxCountInStack)
      const xOffset = startOffset + column * 100
      chips.push(
        <Chip
          position="absolute"
          isCash={isCash}
          zIndex={1}
          left="50%"
          top="0%"
          transform={` rotateX(45deg) translate(${xOffset}%,calc(${yOffset / -2.3}vh - 105%))`}
          mainFill={chipsColors[values[i]]}
          key={`${values[i]}${i}${j}`}
          value={values[i]}
        />
      )
      if(++yOffset >= maxCountInStack) yOffset = 0
      k++
    }
  })

  return (
    <Box {...rest}>
      {chips}
      <PotSum
        pos="static"
        // fontSize="1.7vh"
        // left={reversed ? 'initial' : `4vh`}
        // right={reversed ? '0.5vh' : `initial`}

        px="1.2vh"
        pt="0.3vh"
        pb="0.2vh"
      >
        {children}
      </PotSum>
    </Box>
  )
}
