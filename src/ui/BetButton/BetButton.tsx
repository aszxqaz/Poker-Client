import { PropsWithChildren } from 'react'

type BetButtonProps = {}

export const BetButton: React.FC<PropsWithChildren<BetButtonProps>> = ({
  children,
}) => {
  return <button>{children}</button>
}
