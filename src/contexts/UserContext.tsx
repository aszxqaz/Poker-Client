import { Spinner } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useContext } from 'react'
import { useMeQuery, useQueryClientSetUser } from '../api/auth'
import { UserEntityServerResponse, BalanceEntityServerResponse } from '../api/response-types'

type UserContext = {
  user: UserEntityServerResponse
  balance: BalanceEntityServerResponse
  setBalance: (balance: BalanceEntityServerResponse) => void
  isLoading: boolean
  isFetching: boolean
}

const UserContext = createContext<UserContext>({
  user: {
    avatar: '',
    username: '',
  },
  balance: {
    usd: 0,
  },
  setBalance: () => {},
  isLoading: false,
  isFetching: false,
})

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading, isFetching, error } = useMeQuery()
  const { setBalance } = useQueryClientSetUser()

  if (isFetching) return <Spinner size="xl" m="auto" />

  return (
    <UserContext.Provider
      value={{ user: data?.user!, balance: data?.balance!, isLoading, isFetching, setBalance }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
