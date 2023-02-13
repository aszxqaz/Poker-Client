import { Box, Center, Flex, Image } from '@chakra-ui/react'
import { CARD_COLORS } from './config/card'
import backTexture from '../../assets/images/purple.jpg'
import smallLogo from '../../assets/images/logo-sm.svg'
import { Rank, Suit } from '../Rank/ranks'
import { suitGradients } from '../../styles/suitGradients'

export type CardProps = {
  card: number[] | null
  size?: 'md' | 'lg'
  w?: number
  h?: number
}

const bgImages = [
  //0f5e0f
  'linear-gradient(to right bottom, #053a05, #0e350e)',
  'linear-gradient(to right bottom, #0a4052, #0f323d)',
  'linear-gradient(to right bottom, #a30f0f, #660b0b)',
  'linear-gradient(to right bottom, rgb(42 42 42), rgb(15 15 15))',
]
const shadowColors = ['#0b280b', '#0a2229', '#450707', '#080808']
const topSuitFill = ['#317a31', '#6565a7', '#c34747', '#3c3c3c']

export const Card: React.FC<CardProps> = ({ card, size = 'md', w, h }) => {
  const isFront = card !== null
  return (
    <Flex
      bgImage={isFront ? bgImages[card[1]] : undefined}
      p="0.4em"
      borderRadius="lg"
      // boxShadow={isFront ? `0.2em 0.2em 0px ${shadowColors[card[1]]}` : undefined}
      outline="1px solid rgb(255 255 255 / 50%)"
      fontSize="clamp(0.8rem, 1.2vw + 0.3rem, 1.5rem)"
    >
      {isFront ? (
        <Flex flexDir="column" alignItems="center">
          <Box h="1em">
            <Rank rank={card[0]} suit={card[1]} style={{ fill: 'whitesmoke', height: '100%' }} />
          </Box>
          <Box h="0.875em">
            <Suit suit={card[1]} style={{ fill: 'whitesmoke', height: '100%' }} />
          </Box>
        </Flex>
      ) : null}
      <Flex
        flexDir="column"
        // px={withMultiplier(0.6)}
        // py={withMultiplier(0.6)}
        data-card-suit={isFront ? card[1] : null}
        // border={isFront ? '0.3vh solid' : '0.1vh solid'}
        // borderColor={isFront ? 'white' : 'gray.300'}
        // borderRadius="0.8vh"
        gap="0.8em"
        // backgroundImage={
        //   isFront
        //     ? 'linear-gradient(to right bottom, rgb(174, 235, 231), white, rgb(174, 235, 231))'
        //     : backTexture
        // }
        // boxShadow={`2px 2px 15px 0px rgb(0 0 0 / 50%), inset 0 0 5px 0px rgb(0 0 0 /20%) ${
        //   !isFront ? ', 2px 2px 1px 2px rgb(0 0 0 / 50%)' : ''
        // }`}
        // w={w ? w : size !== 'lg' ? '7vh' : undefined}
        // h={h ? h : size !== 'lg' ? '12.5vh' : undefined}
        justifyContent={!isFront ? 'center' : undefined}
        alignItems="center"
      >
        {isFront ? (
          <>
            <Center h="1.75em" w="full">
              <Suit suit={card[1]} style={{ fill: topSuitFill[card[1]], height: '100%' }} />
            </Center>
            <Box h="1.75em" w="full" transform="scaleY(1.2)" transformOrigin="center bottom">
              <Rank rank={card[0]} suit={card[1]} style={{ fill: 'whitesmoke' }} />
            </Box>
          </>
        ) : (
          <Image
            src={smallLogo}
            w="4vh"
            filter="invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%) opacity(70%) "
          />
        )}
      </Flex>
    </Flex>
  )
}
