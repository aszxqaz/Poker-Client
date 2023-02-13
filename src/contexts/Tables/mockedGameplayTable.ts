import { GameplayTable } from '../../types'

export const mockedGameplayTable: GameplayTable = {
  id: 0,
  state: 'ACTIVE',
  name: 'Heads Up $5',
  players: [
    {
      avatar: 'assets/avatars/avatar-male-1.svg',
      chips: 1500,
      username: 'maxim1',
    },
    {
      avatar: 'assets/avatars/avatar-male-2.svg',
      chips: 1500,
      username: 'Maxim92',
    },
    {
      avatar: 'assets/avatars/avatar-male-3.svg',
      chips: 1500,
      username: 'aszxqaz',
    },
    {
      avatar: 'assets/avatars/avatar-male-4.svg',
      chips: 1500,
      username: 'balalaika',
    },
    {
      avatar: 'assets/avatars/avatar-male-5.svg',
      chips: 1500,
      username: 'suoermario1992',
    },
    {
      avatar: 'assets/avatars/avatar-male-6.svg',
      chips: 1500,
      username: 'suomimasterAZ',
    },
    {
      avatar: 'assets/avatars/avatar-male-7.svg',
      chips: 1500,
      username: '12312push',
    },
    {
      avatar: 'assets/avatars/avatar-female-1.svg',
      chips: 1500,
      username: 'DONKDONKDONK',
    },
    {
      avatar: 'assets/avatars/avatar-female-2.svg',
      chips: 1500,
      username: 'DONKDONKDONKDO',
    },
  ],
  tableSize: 6,
  round: {
    allinShowdown: false,
    bb: 20,
    bbIndex: 1,
    board: [
      [8, 1],
      [9, 0],
      [10, 2],
      [11, 1],
      [12, 3],
    ],
    buttonIndex: 0,
    cards: [],
    winners: [],
    done: false,
    hand: 0,
    isHeroTurn: true,
    isLast: false,
    isSitOut: false,
    isWaitingForBB: false,
    minbet: 0,
    players: [
      {
        bet: 99,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'maxim1',
      },
      {
        bet: 49,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'Maxim92',
      },
      {
        bet: 79,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'aszxqaz',
      },
      {
        bet: 99,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'balalaika',
      },
      {
        bet: 37,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'suoermario1992',
      },
      {
        bet: 111,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'suomimasterAZ',
      },
      {
        bet: 112,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: '12312push',
      },
      {
        bet: 79,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'DONKDONKDONK',
      },
      {
        bet: 13,
        chips: 1000,
        isDone: false,
        isOut: false,
        isSitOut: false,
        isTurn: false,
        limit: 0,
        username: 'DONKDONKDONKDO',
      },
    ],
    pot: 1000,
    prev: null,
    sbIndex: 0,
    showdown: [],
    state: 'PLAYING',
    timestamp: 0,
    toCall: 20,
    TURN_TIMEOUT: 0,
    turnIndex: 0,
  },
  type: 'TOURNEY',
}