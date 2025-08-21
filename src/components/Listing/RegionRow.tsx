import { ListingCard } from "./ListingCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import type { RegionData } from "@/data/types";

export function RegionRow({ data }: { data: RegionData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{data.region}</h3>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 min-w-[600px]">
          {data.listings.length > 0 ? (
            data.listings.map((l) => <ListingCard key={l.id} item={l} />)
          ) : (
            <div className="flex items-center justify-center text-muted-foreground w-full">
              No results
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}