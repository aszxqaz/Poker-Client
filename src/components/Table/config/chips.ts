import { PORTRAIT } from './chipsPortrait'

export const chipsColors = {
  1: 'rgb(237, 193, 107)',
  5: 'rgb(107, 222, 153)',
  10: 'rgb(179, 179, 179)',
  25: 'rgb(140, 183, 239)',
  50: 'rgb(234, 126, 55)',
  100: 'rgb(0, 0, 0)',
  500: 'rgb(33, 33, 255)',
  1000: 'rgb(105, 153, 0)',
  2000: 'lightblue',
}

const PREDEFINED = {
  BOTTOM_CENTER: {
    left: '46%',
    top: '41%',
  },
  TOP_CENTER: {
    left: '46%',
    top: '8%',
  },
  RIGHT_CENTER: {
    right: '12%',
    top: '28%',
    reversed: true,
  },
  LEFT_CENTER: {
    left: '8%',
    top: '28%',
  },
}

const LANDSCAPE = {
  BOTTOM: {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, calc(-100% - 1em)  )',
  },
  TOP: {
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, calc(100% + 1em)  )',
  },
}

export const LANDSCAPE_CHIPS_STACK_POSITIONS = {
  2: [LANDSCAPE.BOTTOM, LANDSCAPE.TOP],
  3: [LANDSCAPE.BOTTOM, PORTRAIT.LEFT, PORTRAIT.RIGHT],
  4: [LANDSCAPE.BOTTOM, PORTRAIT.LEFT, PORTRAIT.TOP_LEFT, PORTRAIT.RIGHT],
  6: [
    LANDSCAPE.BOTTOM,
    PORTRAIT.LEFT,
    PORTRAIT.LEFT,
    LANDSCAPE.TOP,
    PORTRAIT.RIGHT,
    { left: 0, bottom: 0, transform: 'translateX(calc(-100% - 1em))', reversed: true },
  ],
  9: [
    LANDSCAPE.BOTTOM,
    {
      right: 0,
      top: 0,
      transform: 'translateX(calc(100% + 1em))',
    },
    {
      right: 0,
      top: '50%',
      transform: 'translate(calc(100% + 1em), -50%)',
    },
    PORTRAIT.LEFT,
    PORTRAIT.TOP_LEFT,
    PORTRAIT.TOP_RIGHT,
    PORTRAIT.RIGHT,
    {
      left: 0,
      top: '50%',
      transform: 'translate(calc(-100% - 0.8em), -50%)',
      reversed: true,
    },
    { left: 0, top: 0, transform: 'translateX(calc(-100% - 0.8em))', reversed: true },
  ],
}

// export const CHIPS_STACK_POSITIONS2 = {
//   0: [],
//   1: [PREDEFINED.BOTTOM_CENTER],
//   2: [PREDEFINED.BOTTOM_CENTER, PREDEFINED.TOP_CENTER],
//   3: [PREDEFINED.BOTTOM_CENTER, PREDEFINED.LEFT_CENTER, PREDEFINED.RIGHT_CENTER],
//   4: [PREDEFINED.BOTTOM_CENTER, PREDEFINED.LEFT_CENTER, PREDEFINED.TOP_CENTER, PREDEFINED.RIGHT_CENTER],
//   5: [
//     PREDEFINED.BOTTOM_CENTER,
//     {
//       left: '7.5%',
//       top: '32%',
//     },
//     {
//       left: '24%',
//       top: '10%',
//     },
//     {
//       right: '26%',
//       top: '10%',
//       reversed: true,
//     },
//     {
//       right: '11%',
//       top: '32%',
//       reversed: true,
//     },
//   ],
//   6: [
//     PREDEFINED.BOTTOM_CENTER,
//     {
//       left: '10%',
//       top: '35%',
//     },
//     {
//       left: '10%',
//       top: '15%',
//     },
//     PREDEFINED.TOP_CENTER,
//     {
//       right: '14%',
//       top: '15%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//   ],
//   7: [
//     PREDEFINED.BOTTOM_CENTER,
//     {
//       left: '10%',
//       top: '35%',
//     },
//     {
//       left: '10%',
//       top: '15%',
//     },
//     PREDEFINED.TOP_CENTER,
//     {
//       right: '14%',
//       top: '15%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//   ],
//   8: [
//     PREDEFINED.BOTTOM_CENTER,
//     {
//       left: '10%',
//       top: '35%',
//     },
//     {
//       left: '10%',
//       top: '15%',
//     },
//     PREDEFINED.TOP_CENTER,
//     {
//       right: '14%',
//       top: '15%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//   ],
//   9: [
//     PREDEFINED.BOTTOM_CENTER,
//     {
//       left: '10%',
//       top: '35%',
//     },
//     {
//       left: '10%',
//       top: '15%',
//     },
//     PREDEFINED.TOP_CENTER,
//     {
//       right: '14%',
//       top: '15%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//     {
//       right: '14%',
//       top: '35%',
//       reversed: true,
//     },
//   ],
// }
