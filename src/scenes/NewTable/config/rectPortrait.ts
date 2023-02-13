import { PORTRAIT } from "../../../components/Table/config/chipsPortrait"

const RECT_PORTRAIT_OFFSETS = {
  x: '100%',
  translateX: '30%',
}

const RECT_PORTRAIT = {
  hero: {
    bottom: '0%',
    left: '50%',
    transform: 'translateX(-50%)',
    chipsPos: {
      left: '50%',
      top: 0,
      transform: 'translate(-50%, calc(-100% - 0.8em))',
    }
  },
  topCenter: {
    left: '50%',
    top: '0%',
    transform: 'translateX(-50%)',
  },
  leftCenter: {
    top: '50%',
    right: RECT_PORTRAIT_OFFSETS.x,
    transform: `translate(${RECT_PORTRAIT_OFFSETS.translateX}, -50%)`,
  },
  rightCenter: {
    top: '50%',
    left: RECT_PORTRAIT_OFFSETS.x,
    transform: `translate(-${RECT_PORTRAIT_OFFSETS.translateX}, -50%)`,
    reversed: true,
  },
}

export const RECT_PLATES_POSITIONS_PORTRAIT = {
  2: [RECT_PORTRAIT.hero, RECT_PORTRAIT.topCenter],
  3: [
    RECT_PORTRAIT.hero,
    {
      top: '50%',
      right: RECT_PORTRAIT_OFFSETS.x,
      transform: `translate(${RECT_PORTRAIT_OFFSETS.translateX}, -50%)`,
    },
    {
      top: '30%',
      left: RECT_PORTRAIT_OFFSETS.x,
      transform: `translate(-${RECT_PORTRAIT_OFFSETS.translateX}, -50%)`,
      reversed: true,
    },
  ],
  4: [RECT_PORTRAIT.hero, RECT_PORTRAIT.leftCenter, RECT_PORTRAIT.topCenter, RECT_PORTRAIT.rightCenter],
  6: [
    RECT_PORTRAIT.hero,
    {
      ...RECT_PORTRAIT.leftCenter,
      top: '50%',
    },
    {
      ...RECT_PORTRAIT.leftCenter,
      top: '25%',
    },
    RECT_PORTRAIT.topCenter,
    {
      ...RECT_PORTRAIT.rightCenter,
      top: '50%',
    },
    {
      ...RECT_PORTRAIT.rightCenter,
      top: '25%',
    },
  ],
  9: [
    RECT_PORTRAIT.hero,
    {
      ...RECT_PORTRAIT.leftCenter,
      top: '55%',
    },
    {
      ...RECT_PORTRAIT.leftCenter,
      top: '41%',
    },
    {
      ...RECT_PORTRAIT.leftCenter,
      top: '26%',
    },
    {
      ...RECT_PORTRAIT.leftCenter,
      top: '11%',
      chipsPos: PORTRAIT.LEFT
    },
    {
      ...RECT_PORTRAIT.rightCenter,
      top: '11%',
      chipsPos: PORTRAIT.RIGHT
    },
    {
      ...RECT_PORTRAIT.rightCenter,
      top: '26%',
    },
    {
      ...RECT_PORTRAIT.rightCenter,
      top: '41%',
    },
    {
      ...RECT_PORTRAIT.rightCenter,
      top: '55%',
    },
  ],
}
