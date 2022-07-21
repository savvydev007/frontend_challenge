/* eslint-disable no-unused-vars */
interface Address {
  address: string
  city: string
  state: string
  zip: number | string
  country: string
}

interface Debtor {
  title?: string
  firstName?: string
  lastName?: string
  address?: Address
  mobilePhone?: string
  email?: string
}

interface Account {
  id: string
  debtor?: Debtor
}

interface Claim {
  id: string
  currency: string
  baseAmount: number
  fees: number
  dueDate: string | Date
  status: string
}