

const LANDSCAPE_SIMPLE = {
  LEFT: {
    left: 0,
    transform: 'translateX(-40%)',
  },
  RIGHT: {
    right: 0,
    transform: 'translateX(40%)',
    reversed: true,
  },
}

const RECT_LANDSCAPE = {
  BOTTOM: {
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, 40%)',
  },
  TOP: {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -40%)',
  },
  topCenter: {
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',
  },
  LEFT: {
    top: '50%',
    left: 0,
    transform: 'translate(-50%, -50%)',
  },
  LEFT_TOP: {
    top: '20%',
    left: 0,
    transform: 'translateX(-25%)',
  },
  LEFT_MIDDLE: {
    top: '50%',
    left: 0,
    transform: 'translate(-50%, -50%)',
  },
  LEFT_BOTTOM: {
    bottom: '20%',
    left: 0,
    transform: 'translateX(-25%)',
  },

  RIGHT: {
    top: '50%',
    right: 0,
    transform: 'translate(50%, -50%)',
    reversed: true,
  },
}


export const PLATES_POSITIONS_LANDSCAPE = {
  2: [RECT_LANDSCAPE.BOTTOM, RECT_LANDSCAPE.TOP],
  3: [
    RECT_LANDSCAPE.BOTTOM,
    {
      top: '40%',
      left: 0,
      transform: 'translate(-50%, -50%)',
    },
    {
      top: '40%',
      right: 0,
      transform: 'translate(50%, -50%)',
    },
  ],
  4: [RECT_LANDSCAPE.BOTTOM, RECT_LANDSCAPE.LEFT, RECT_LANDSCAPE.TOP, RECT_LANDSCAPE.RIGHT],
  a: [
    RECT_LANDSCAPE.BOTTOM,
    RECT_LANDSCAPE.LEFT_BOTTOM,
    RECT_LANDSCAPE.LEFT_TOP,
    {
      left: '85%',
      top: '20%',
      reversed: true,
    },
    {
      left: '85%',
      bottom: '20%',
      reversed: true,
    },
  ],
  6: [
    RECT_LANDSCAPE.BOTTOM,
    {
      bottom: '20%',
      left: 0,
      transform: 'translateX(-40%)',
    },
    {
      top: '20%',
      left: 0,
      transform: 'translateX(-40%)',
    },
    RECT_LANDSCAPE.TOP,
    {
      top: '20%',
      right: 0,
      transform: 'translateX(40%)',
      reversed: true,
    },
    {
      bottom: '20%',
      right: 0,
      transform: 'translateX(40%)',
      reversed: true,
    },
  ],
  9: [
    RECT_LANDSCAPE.BOTTOM,
    {
      left: '10%',
      bottom: 0,
      transform: 'translate(-50%, -30%)',
    },
    {
      left: '0%',
      bottom: '44%',
      transform: 'translate(-50%, 50%)',
    },
    {
      left: '0%',
      top: '22%',
      transform: 'translate(-50%, -50%)',
    },
    {
      top: 0,
      left: '33%',
      transform: 'translate(-50%, -40%)',
    },
    {
      top: 0,
      right: '33%',
      transform: 'translate(50%, -40%)',
    },
    {
      right: '0%',
      top: '22%',
      transform: 'translate(50%, -50%)',
      reversed: true,
    },
    {
      right: '0%',
      bottom: '44%',
      transform: 'translate(50%, 50%)',
      reversed: true,
    },
    {
      right: '10%',
      bottom: 0,
      transform: 'translate(50%, -30%)',
      reversed: true,
    },
  ],
}
