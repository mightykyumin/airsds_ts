import type { DateRange } from "react-day-picker"

export type Props = {
  value: DateRange | undefined
  onChange: (v: DateRange | undefined) => void
  placeholder?: string
  className?: string
}

export type Listing = {
  id: number
  name: string
  location: string
  address: string
  price: number
  image: string[]
}

export type RegionData = {
  region: string
  listings: Listing[]
}

export type HostingData = {
  userId: number
  address: string
  location: string
  price: string
  title: string
  content: string
  imageUrl: string[]
}