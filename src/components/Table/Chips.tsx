import { Box, BoxProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type ChipSVGProps = {
  fill1?: string
  fill2?: string
  fill3?: string
  mainFill: string
} & React.SVGProps<SVGSVGElement>

export const ChipSVG: React.FC<ChipSVGProps> = ({
  fill1 = '#ffffff',
  fill2 = '#00ff00',
  fill3 = '#ffffff',
  mainFill,
  ...rest
}) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 496.159 496.159"
      // width="3.5vh"
      // height="3.5vh"
      xmlSpace="preserve"
      {...rest}
    >
      <path
        style={{ fill: mainFill }}
        d="M248.083,0.003C111.071,0.003,0,111.063,0,248.085c0,137.001,111.07,248.07,248.083,248.07
	c137.006,0,248.076-111.069,248.076-248.07C496.159,111.062,385.089,0.003,248.083,0.003z"
      />
      <path
        style={{ fill: fill2 }}
        d="M248.082,77.871c-94.006,0-170.213,76.2-170.213,170.212c0,93.999,76.207,170.205,170.213,170.205
	c94.001,0,170.208-76.206,170.208-170.205C418.29,154.07,342.084,77.871,248.082,77.871z"
      />
      <path
        style={{ fill: fill1 }}
        d="M248.082,91.37c-86.55,0-156.714,70.156-156.714,156.713c0,86.543,70.164,156.707,156.714,156.707
	c86.547,0,156.709-70.163,156.709-156.707C404.791,161.526,334.629,91.37,248.082,91.37z"
      />
      <g>
        <path
          style={{ fill: fill3 }}
          d="M248.083,0.003c-15.721,0-31.094,1.479-46.003,4.274v61.302h92V4.276
		C279.173,1.481,263.802,0.003,248.083,0.003z"
        />
        <path
          style={{ fill: fill3 }}
          d="M202.08,429.579v62.301c14.909,2.796,30.283,4.275,46.003,4.275c15.718,0,31.089-1.479,45.997-4.274
		v-62.302H202.08z"
        />
        <path
          style={{ fill: fill3 }}
          d="M432.217,81.845l-52.496,31.903l47.78,78.62l52.681-32.016
		C469.141,131.157,452.761,104.587,432.217,81.845z"
        />
        <path
          style={{ fill: fill3 }}
          d="M68.66,302.79l-52.991,32.204c10.94,29.238,27.236,55.858,47.7,78.669l53.071-32.253L68.66,302.79z"
        />
        <path
          style={{ fill: fill3 }}
          d="M427.624,302.385l-47.602,78.728l53.142,32.131c20.41-22.855,36.651-49.507,47.526-78.774
		L427.624,302.385z"
        />
        <path
          style={{ fill: fill3 }}
          d="M63.572,82.264c-20.492,22.786-36.818,49.388-47.793,78.612l52.757,31.898l47.602-78.728
		L63.572,82.264z"
        />
      </g>
    </svg>
  )
}

type ChipProps = {
  mainFill: string
  value: number
  isCash: boolean
} & BoxProps

export const Chip: React.FC<PropsWithChildren<ChipProps>> = ({ mainFill, value, isCash, ...rest }) => {
  const nom = isCash
    ? value > 99
      ? Math.trunc(value / 100).toString()
      : value.toString().concat('¢')
    : value < 1000
    ? value
    : (value / 1000).toFixed(2).concat('k')

  return (
    <Box pos="absolute" transform="rotateX(45deg)" {...rest}>
      <ChipSVG
        mainFill={mainFill}
        style={{
          width: '2em',
        }}
      />
      <Box
        as="span"
        fontSize="1em"
        fontWeight="900"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="gray.700"
      >
        {nom}
      </Box>
    </Box>
  )
}
