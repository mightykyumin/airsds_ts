import './App.css'
import './index.css'
import "react-day-picker/dist/style.css"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { DateRangePicker } from "./components/DateRangePicker/DateRangePicker"
import { RegionRow } from "./components/Listing/RegionRow"
import { HostingDialog } from './components/Hosting/HostingDialog'
import { LoginDialog } from './components/Auth/LoginDialog'
import { filterByQuery } from "@/lib/utils"
import { fetchRegionData } from '@/lib/utils'

import { getRegionData } from './api/regionapi'
//import { MOCK } from "./data/MOCK"
import axios from 'axios'
import type { RegionData } from './data/types'

export default function App() {
  /////////////////////// Fetch Data //////////////////////
  
  useEffect(() => {
    fetchRegionData(setRegions, setLoading)
  }, [])

  //////////////////////// Variables /////////////////////
  const [query, setQuery] = useState("")
  const [range, setRange] = useState<DateRange | undefined>()
  const [regions, setRegions] = useState<RegionData[]>([])
  
  const [loading, setLoading] = useState(true)
  const filtered = useMemo(() => {
  return filterByQuery(regions, query)
}, [query, regions])


  ////////////////////////////////////////////View ///////////////////////////////////////////////////
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="container py-4 flex items-center justify-between gap-4">
          <div className="text-2xl font-extrabold tracking-tight">AIRSDS</div>

          <div className="flex items-center gap-2">
            <HostingDialog />
            <LoginDialog />
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Explore stays</h2>
          <p className="text-muted-foreground text-sm">Pick your dates and browse by region</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-w-[1180px]">
          <div className="lg:col-span-6">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destination, stay name..." />
          </div>
          <div className="lg:col-span-4">
            <DateRangePicker value={range} onChange={setRange} />
          </div>
          <div className="lg:col-span-2">
            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-10">
          {filtered.map((r) => (
            <RegionRow key={r.region} data={r} />
          ))}
          {filtered.length === 0 && <div className="text-muted-foreground">No results</div>}
        </div>
      </main>
    </div>
  )
}

 

