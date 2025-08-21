import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { Listing } from "@/data/types";

export function ListingCard({ item }: { item: Listing }) {
  return (
    <Link to={`/rooms/${item.id}`} className="block"> {/* (2) 카드 전체를 Link로 감쌈 */}
      <Card className="w-[280px] shrink-0 p-0">
        <CardHeader className="p-0">
          <div className="h-40 w-full overflow-hidden rounded-t-xl">
            <img src={item.image[0]} alt={item.name} className="h-full w-full object-cover" />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-1">
          <CardTitle className="text-base">{item.name}</CardTitle>
          <div className="text-sm text-muted-foreground">{item.location}</div>
          <div className="text-sm">₩{item.price.toLocaleString()}/night</div>
        </CardContent>
      </Card>
    </Link>
  )
}