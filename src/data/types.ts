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
  price: number
  image: string[]
}

export type RegionData = {
  region: string
  listings: Listing[]
}

export type HostingData = {
  address: string
  location: string
  price: string
  name: string
  content: string
  images: string[]
}