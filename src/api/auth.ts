import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { BalanceEntityServerResponse, UserEntityServerResponse, UserServerResponse } from './response-types'

const authPaths = {
  signUp: `/auth/signup`,
  signIn: `/auth/signin`,
  me: '/auth/me',
}

type SignUpFormValues = {
  username: string
  email: string
  password: string
  confirm: string
}

type SignInFormValues = {
  username: string
  password: string
}

export const authAPI = {
  signUp: async (body: SignUpFormValues) =>
    api
      .post(authPaths.signUp, { ...body })
      .then(res => res.data)
      .catch(e => {
        throw e.response.data.message
      }),

  signIn: async (body: SignInFormValues) =>
    api
      .post<UserServerResponse>(authPaths.signIn, { ...body })
      .then(res => res.data)
      .catch(e => {
        throw e.response.data.message
      }),

  me: async () => api.get<UserServerResponse>(authPaths.me).then(res => res.data),
}

export const useMeQuery = () =>
  useQuery(['user'], authAPI.me, {
    refetchOnWindowFocus: false,
    retry: false,
  })

export const useSignInMutation = () => {
  const client = useQueryClient()
  const {
    mutate: signIn,
    isLoading,
    error,
    data,
    isError,
  } = useMutation<UserServerResponse, string, SignInFormValues, unknown>(authAPI.signIn, {
    onSuccess: data => {
      // client.invalidateQueries(['user'])
      client.setQueryData<UserServerResponse>(['user'], user => ({
        ...data,
      }))
    },
  })

  return { signIn, isLoading, error, isError, data }
}

export const useSignUpMutation = () =>
  useMutation<UserServerResponse, string, SignUpFormValues, unknown>(authAPI.signUp)

export const useQueryClientSetUser = () => {
  const client = useQueryClient()

  const userData = client.getQueryData<UserServerResponse>(['user'])

  const setBalance = (balance: BalanceEntityServerResponse) => {
    client.setQueryData<UserServerResponse>(['user'], user =>
      userData
        ? {
            ...userData,
            balance,
          }
        : user
    )
  }

  return { setBalance }
}
