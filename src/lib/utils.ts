import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { RegionData } from "@/data/types"
import axios from 'axios'
import { endpointIp } from "@/data/Endpoint"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


///////////////////////////////데이터 이름별 filter //////////////////////////////
export function filterByQuery(regions: RegionData[], query: string): RegionData[] {
  const trimmedQuery = query.trim().toLowerCase()
  if (!trimmedQuery) return regions

  return regions
    .map(region => ({
      ...region,
      listings: region.listings.filter(listing =>
        listing.name.toLowerCase().includes(trimmedQuery) ||
        listing.location.toLowerCase().includes(trimmedQuery) ||
        listing.address.toLowerCase().includes(trimmedQuery)
      )
    }))
    .filter(region => region.listings.length > 0)
}

////////////////////////////////////////////////////////////////////////////
// /////////////////ghouse_list Get method Fetch///////////////////////////

export async function fetchRegionData(
  setRegions: (data: RegionData[]) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    const res = await axios.get('http://' + endpointIp   + ':8080/ghouse')
    console.log(res.data)
    setRegions(res.data.regions)
  } catch (err) {
    console.error('Failed to fetch region data', err)
  } finally {
    setLoading(false)
  }
}

///////////////////////////////////////////////////////////////////////////
//////////////////// 예약 가능 숙소 Filter ///////////////////////////////
import type { DateRange } from "react-day-picker"

function getDateRangeList(from: Date, to: Date): string[] {
  const list = []
  const current = new Date(from)

  while (current <= to) {
    list.push(current.toISOString().slice(0, 10))
    current.setDate(current.getDate() + 1)
  }

  return list
}

export async function calendarFilterByReservedDates(
  range: DateRange | undefined,
  regions: RegionData[],
  query: string,
  setFilteredResult: (regions: RegionData[]) => void
) {
  if (!range?.from || !range?.to) return

  try {
    const res = await axios.get("http://" + endpointIp + ":8080/ghouse/bookingday")
    console.log(res)
    const reserved = res.data as { ghouseId: number; date: string[] }[]

    const selectedDates = getDateRangeList(range.from, range.to)

    const updated = regions
      .map(region => ({
        ...region,
        listings: region.listings.filter(listing => {
          const ghouseReserved = reserved.find(r => r.ghouseId === listing.id)
          if (!ghouseReserved) return true

          return !ghouseReserved.date.some(date => selectedDates.includes(date))
        })
      }))
      .filter(region => region.listings.length > 0)

    setFilteredResult(updated)
  } catch (err) {
    console.error("Failed to filter by reserved dates:", err)
  }
}




