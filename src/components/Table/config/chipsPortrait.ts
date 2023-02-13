
export const PORTRAIT = {
  BOTTOM: {
    left: '50%',
    top: '-130%',
    transform: 'translate(-50%, -0.8em)',
  },
  LEFT: {
    right: 0,
    bottom: 0,
    transform: 'translateX(calc(100% + 0.8em))',
  },
  RIGHT: {
    left: 0,
    bottom: 0,
    transform: 'translateX(calc(-100% - 0.8em))',
    reversed: true,
  },
  TOP_LEFT: {
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, calc(100% + 0.8em))',
  },
  TOP_RIGHT: {
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, calc(100% + 0.8em))',
    reversed: true,
  },
}

export const PORTRAIT_CHIPS_STACK_POSITIONS = {
  // 0: [],
  // 1: [PORTRAIT.BOTTOM],
  2: [PORTRAIT.BOTTOM, PORTRAIT.TOP_LEFT],
  3: [PORTRAIT.BOTTOM, PORTRAIT.LEFT, PORTRAIT.RIGHT],
  4: [PORTRAIT.BOTTOM, PORTRAIT.LEFT, PORTRAIT.TOP_LEFT, PORTRAIT.RIGHT],
  // 5: [PORTRAIT.BOTTOM, PORTRAIT.LEFT, PORTRAIT.LEFT, PORTRAIT.RIGHT, PORTRAIT.RIGHT],
  6: [PORTRAIT.BOTTOM, PORTRAIT.LEFT, PORTRAIT.LEFT, PORTRAIT.TOP_LEFT, PORTRAIT.RIGHT, PORTRAIT.RIGHT],
  // 7: [
  //   PORTRAIT.BOTTOM,
  //   PORTRAIT.LEFT,
  //   PORTRAIT.LEFT,
  //   { left: '80%', bottom: 0, transform: 'translateY(calc(100% + 0.8em))' },
  //   { right: '80%', bottom: 0, transform: 'translateY(calc(100% + 0.8em))', reversed: true },
  //   PORTRAIT.RIGHT,
  //   PORTRAIT.RIGHT,
  // ],
  // 8: [
  //   PORTRAIT.BOTTOM,
  //   PORTRAIT.LEFT,
  //   PORTRAIT.LEFT,
  //   PORTRAIT.LEFT,
  //   PORTRAIT.TOP_LEFT,
  //   PORTRAIT.RIGHT,
  //   PORTRAIT.RIGHT,
  //   PORTRAIT.RIGHT,
  // ],
  9: [
    PORTRAIT.BOTTOM,
    PORTRAIT.LEFT,
    PORTRAIT.LEFT,
    PORTRAIT.LEFT,
    PORTRAIT.TOP_LEFT,
    PORTRAIT.TOP_RIGHT,
    PORTRAIT.RIGHT,
    PORTRAIT.RIGHT,
    PORTRAIT.RIGHT,
  ],
}
