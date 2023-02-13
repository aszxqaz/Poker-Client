export const isEqualUsername =
  <T extends { username: string }, K extends { username: string }>(obj1: T) =>
  (obj2: K) =>
    obj1.username === obj2.username
