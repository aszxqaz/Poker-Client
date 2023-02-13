import { Center } from '@chakra-ui/react'
import { MutableRefObject, PropsWithChildren, useEffect, useRef } from 'react'

// if ratio = 0.5 = 5%, ratio = 1 = 0
//0.5x = 95, 1x = 90

export const GreenPartOfTable: React.FC<PropsWithChildren<{ isPortrait: boolean; ratio: number }>> = ({
  isPortrait,
  children,
  ratio,
}) => (
  <Center
    borderRadius="inherit"
    w={isPortrait ? '90%' : '95%'}
    h={isPortrait ? `${(1 - ratio) * 10 + 90}%` : '90%'}
    bgImage="radial-gradient(hsl(120deg 100% 18% / 80%), hsl(120deg 100% 18% / 80%));"
    boxShadow={`0 0 20px 0px rgb(0 0 0 / 80%), 
      0 0 0 1px rgb(255 255 255 / 10%), 
      0 0 0 2px rgb(255 255 255 / 10%), 
      0 0 0 3px rgb(255 255 255 / 10%),
      0 0 0 4px rgb(255 255 255 / 10%),
      0 0 0 5px rgb(255 255 255 / 10%),
      inset 0 0 50vw 0 rgb(0 0 0 / 40%),
      inset 0 0 5rem 0 rgb(0 0 0 / 60%)
`}
    sx={{
      '::after': {
        content: '""',
        borderRadius: 'inherit',
        width: isPortrait ? '90%' : '95%',
        height: isPortrait ? `${(1 - ratio) * 10 + 90}%` : '90%',
        border: `4px solid rgb(255 255 255 / 10%)`,
      },
    }}
  >
    {children}
  </Center>
)

export const GrayBorderOfTable: React.FC<
  PropsWithChildren<{
    isPortrait: boolean
    w?: number
    h?: number
    onHeightCalculated: (height: number) => void
  }>
> = ({ h, isPortrait, w, children, onHeightCalculated }) => {
  const ratio = (w && h && w / h) || 0
  const tableRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    onHeightCalculated(tableRef.current.getBoundingClientRect().height)

  }, [tableRef.current])

  return (
    <Center
      ref={tableRef}
      pos="relative"
      borderRadius={isPortrait ? `50% / ${(ratio * 50) / (ratio + 0.5)}%` : '25% / 50%'}
      w={w}
      h={isPortrait ? 'full' : h}
      bgImage="radial-gradient(white, black)"
      boxShadow={`0 0 2px 0 rgb(0 0 0 / 10%),0 0 4px 0 rgb(0 0 0 / 10%),0 0 6px 0 rgb(0 0 0 / 10%)`}
      m="auto"
      flexGrow={isPortrait ? 1 : undefined}
    >
      {children}
    </Center>
  )
}
