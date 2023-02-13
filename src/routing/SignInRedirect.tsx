import { Navigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

type SignInRedirectProps = {
  to: string
  when: 'in' | 'out'
  children: JSX.Element
}

export const SignInRedirect = ({ when, to, children }: SignInRedirectProps) => {
  const { isFetching, isLoading, user } = useUserContext()

  const location = useLocation()

  if (!user && isLoading) return null

  const shouldRedirect = !!user === (when === 'in')

  return shouldRedirect && to !== location.pathname ? (
    <Navigate to={to} state={{ from: location }} replace />
  ) : (
    children
  )
}
