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
  image: string
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

export type Ghouse = {
  ghouseId: number
  userId: number
  address: string
  price: number
  content: string
  title: string
  location: string
  createdAt: string
}

export type Review = {
  reviewId: number
  userId: number
  ghouseId: number
  rating: number
  content: string
  createdAt: string | null
  userName?: string
}

export type GhouseImage = {
  imageId: number
  ghouseId: number
  imageUrl: string
}

export type BookingDay = {
  bookingDayId: number
  ghouseId: number
  date: string
}

export type RoomDetailResponse = {
  ghouse: Ghouse
  reviews: Review[]
  ghouseImages: GhouseImage[]
  bookingDays: BookingDay[]
}
