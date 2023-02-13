import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'
import { objectKeys } from '../../utils/objectKeys'
import { Chip } from './Chips'
import { chipsColors } from './config/chips'
import { PotSum } from './PotSum'

type ChipsStackProps = {
  value: number
  reversed?: boolean
  isCash: boolean
} & BoxProps

export const ChipStack: React.FC<PropsWithChildren<ChipsStackProps>> = ({
  value,
  children,
  reversed,
  isCash,
  ...rest
}) => {
  const arr: number[] = []
  let val = value
  const keys = objectKeys(chipsColors).reverse()
  keys.forEach((key, i) => {
    const int = Math.trunc(val / key)
    val -= int * key
    arr.push(int)
  })

  const els: JSX.Element[] = []

  let k = 0
  arr.map((v, i) => {
    for (let j = 0; j < v; j++) {
      els.push(
        <Chip
          isCash={isCash}
          position="absolute"
          transformOrigin="center bottom"
          transform={` translateY(${k++ * -15}%) rotateX(45deg)`}
          mainFill={chipsColors[keys[i]]}
          key={`${keys[i]}${i}${j}`}
          value={keys[i]}
        />
      )
    }
  })

  return (
    <Flex gap="0.7em" flexDir={reversed ? "row-reverse" : "row"} {...rest}>
      <Box w='2em' pos="relative" transform="translateY(-0.5em)">{els}</Box>
      <PotSum
        // left={reversed ? 'initial' : `4vh`}
        // right={reversed ? '0.5vh' : `initial`}
        px="0.5em"
        pb="0.2em"
        pt="0.4em"
        lineHeight={1}
      >
        {children}
      </PotSum>
    </Flex>
  )
}
