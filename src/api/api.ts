import axios from "axios"

const { PROD, VITE_API_URL_PROD, VITE_API_URL_DEV } = import.meta.env
const BASE_API_URL = PROD ? VITE_API_URL_PROD : VITE_API_URL_DEV

export const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
})

export const API_KEYS = {
  SNGS: 'sngs',
  CASHES: 'cashes'
}