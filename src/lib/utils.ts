import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { RegionData } from "@/data/types"
import axios from 'axios'

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
    const res = await axios.get('/ghouse')
    console.log(res.data)
    setRegions(res.data.regions)
  } catch (err) {
    console.error('Failed to fetch region data', err)
  } finally {
    setLoading(false)
  }
}



