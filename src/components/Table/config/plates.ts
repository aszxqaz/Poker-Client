const PREDEFINED_POSITION = {
  hero: {
    top: '43%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  topCenter: {
    left: '50%',
    top: '-7%',
    transform: 'translateX(-50%)',
  },
  leftCenter: {
    left: '0%',
    transform: 'translateX(-80%)',
    top: '20%',
    reversed: true,
  },
  rightCenter: {
    right: '0%',
    top: '20%',
    transform: 'translateX(80%)',
  },
}

export const PLATES_POSITIONS = {
  0: [PREDEFINED_POSITION.hero],
  1: [PREDEFINED_POSITION.hero, PREDEFINED_POSITION.topCenter],
  2: [PREDEFINED_POSITION.hero, PREDEFINED_POSITION.leftCenter, PREDEFINED_POSITION.rightCenter],
  3: [
    PREDEFINED_POSITION.hero,
    PREDEFINED_POSITION.leftCenter,
    PREDEFINED_POSITION.topCenter,
    PREDEFINED_POSITION.rightCenter,
  ],
  4: [
    PREDEFINED_POSITION.hero,
    {
      right: '95%',
      top: '25%',
      reversed: true,
    },
    {
      right: '69%',
      top: '-5%',
      reversed: true,
    },
    {
      left: '69%',
      top: '-5%',
    },
    {
      left: '95%',
      top: '25%',
    },
  ],
  5: [
    PREDEFINED_POSITION.hero,
    {
      right: '92%',
      top: '30%',
      reversed: true,
    },
    {
      right: '92%',
      top: '5%',
      reversed: true,
    },
    PREDEFINED_POSITION.topCenter,
    {
      left: '92%',
      top: '5%',
    },
    {
      left: '92%',
      top: '30%',
    },
  ],
}
