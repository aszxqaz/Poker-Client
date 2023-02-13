const PORTRAIT = {
  PREDEFINED_X_OFFSET: '96%',
}

const CIRCLE_PORTRAIT = {
  hero: {
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 20%)',
  },
  topCenter: {
    left: '50%',
    top: '5%',
    transform: 'translate(-50%, -50%)',
  },
  leftCenter: {
    top: '50%',
    right: PORTRAIT.PREDEFINED_X_OFFSET,
    transform: 'translate(50%, -50%)',
  },
  rightCenter: {
    top: '50%',
    left: PORTRAIT.PREDEFINED_X_OFFSET,
    transform: 'translate(-50%, -50%)',
  },
}

export const CIRCLE_PLATES_POSITIONS_PORTRAIT = {
  2: [CIRCLE_PORTRAIT.hero, CIRCLE_PORTRAIT.topCenter],
  3: [CIRCLE_PORTRAIT.hero, CIRCLE_PORTRAIT.leftCenter, CIRCLE_PORTRAIT.rightCenter],
  4: [
    CIRCLE_PORTRAIT.hero,
    CIRCLE_PORTRAIT.leftCenter,
    CIRCLE_PORTRAIT.topCenter,
    CIRCLE_PORTRAIT.rightCenter,
  ],
  6: [
    CIRCLE_PORTRAIT.hero,
    {
      ...CIRCLE_PORTRAIT.leftCenter,
      top: '50%',
    },
    {
      ...CIRCLE_PORTRAIT.leftCenter,
      top: '25%',
    },
    CIRCLE_PORTRAIT.topCenter,
    {
      ...CIRCLE_PORTRAIT.rightCenter,
      top: '50%',
    },
    {
      ...CIRCLE_PORTRAIT.rightCenter,
      top: '25%',
    },
  ],
  9: [
    CIRCLE_PORTRAIT.hero,
    {
      ...CIRCLE_PORTRAIT.leftCenter,
      top: '52%',
    },
    {
      ...CIRCLE_PORTRAIT.leftCenter,
      top: '37%',
    },
    {
      ...CIRCLE_PORTRAIT.leftCenter,
      top: '22%',
    },
    {
      ...CIRCLE_PORTRAIT.leftCenter,
      right: '70%',
      top: '8%',
    },
    {
      ...CIRCLE_PORTRAIT.rightCenter,
      left: '70%',
      top: '8%',
    },
    {
      ...CIRCLE_PORTRAIT.rightCenter,
      top: '22%',
    },
    {
      ...CIRCLE_PORTRAIT.rightCenter,
      top: '37%',
    },
    {
      ...CIRCLE_PORTRAIT.rightCenter,
      top: '52%',
    },
  ],
}
