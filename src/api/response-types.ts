import { Round } from '../types/round'

export interface UserEntityServerResponse {
  username: string
  avatar: string
}

export interface BalanceEntityServerResponse {
  usd: number
}

export interface RoundPlayer {
  username: string
  avatar: string
  chips: number
  bets: number[]
  isBB: boolean
  isSB: boolean
  done: boolean
}


export interface UserServerResponse {
  user: UserEntityServerResponse
  balance: BalanceEntityServerResponse
}

export interface GetWalletAddressServerResponse {
  wallet: {
    address: string
  }
}


export interface SingleMessageServerResponse {
  message: string
}
