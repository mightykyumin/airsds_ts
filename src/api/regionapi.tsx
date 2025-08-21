import type { RegionData } from '@/data/types'
import axios from 'axios'


const API_BASE = 'https://your-api.com/api'

export const getRegionData = async (): Promise<RegionData[]> => {
  const response = await axios.get<RegionData[]>(`${API_BASE}/regions`)
  return response.data
}


