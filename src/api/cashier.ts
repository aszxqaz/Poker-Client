import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { api } from './api'
import { GetWalletAddressServerResponse } from './response-types'

const cashierPaths = {
  getWallet: '/cashier/wallet',
  checkPayment: '/cashier/check',
}

export const cashierAPI = {
  getWallet: async () =>
    api
      .get<GetWalletAddressServerResponse>(cashierPaths.getWallet)
      .then(res => res.data)
      .catch(e => {
        throw e.response.data.message
      }),

  checkPayment: async () =>
    api
      .get<GetWalletAddressServerResponse>(cashierPaths.checkPayment)
      .then(res => res.data)
      .catch(e => {
        throw e.response.data.message
      }),
}

export const useGetWallet = () => {
  const { isLoading, data } = useQuery<GetWalletAddressServerResponse, string>(
    ['wallet'],
    cashierAPI.getWallet
  )
  const getWallet = useCallback(() => {}, [])
  return { isLoading, data, getWallet }
}

export const useCheckPayment = () => {
  const [enabled, setEnabled] = useState(false)
  const { isLoading, data, isFetching } = useQuery<GetWalletAddressServerResponse, string>(
    ['check'],
    cashierAPI.checkPayment,
    {
      onSettled: () => {
        setEnabled(false)
      },
      enabled
    }
  )

  const checkPayment = useCallback(() => {
    setEnabled(true)
  }, [])

  return { isLoading, data, checkPayment, isFetching }
}