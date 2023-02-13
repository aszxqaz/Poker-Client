export type KeyOf<T, U extends keyof T> = U

export type UnionToIntersectionFn<U> = (
  U extends unknown ? (k: () => U) => void : never
) extends (k: infer I) => void ? I : never;

export type GetUnionLast<U> = UnionToIntersectionFn<U> extends () => infer I 
  ? I : never;

export type Prepend<Tuple extends unknown[], First> = [First, ...Tuple];

export type UnionToTuple<
  Union, 
  T extends unknown[] = [], 
  Last = GetUnionLast<Union>
> = [Union] extends [never] 
  ? T 
  : UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;