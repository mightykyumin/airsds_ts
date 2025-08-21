import { useState } from "react"
import { Home } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function HostingDialog() {
  const [ghouseAddress, setGhouseAddress] = useState("")
  const [ghouseLocation, setGhouseLocation] = useState("")
  const [ghousPrice, setGhousPrice] = useState("")
  const [ghouseName, setGhouseName] = useState("")
  const [ghouseContent, setGhouseContent] = useState("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Home className="h-4 w-4" />
          Hosting
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Host a Place to AIRSDS</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ghouseAddress">Address</Label>
            <Input id="ghouseAddress" type="ghouseAddress" value={ghouseAddress} onChange={(e) => setGhouseAddress(e.target.value)} 
            placeholder="도로명 주소를 입력해주세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ghouseLocation">Location</Label>
            <Input id="ghouseLocation" type="ghouseLocation" value={ghouseLocation} onChange={(e) => setGhouseLocation(e.target.value)}
            placeholder="위치를 입력해주세요 (서울, 제주도, 부산)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ghousPrice">Price</Label>
            <Input id="ghousPrice" type="ghousPrice" value={ghousPrice} onChange={(e) => setGhousPrice(e.target.value)} 
            placeholder="하루 숙박 가격을 입력해주세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ghouseName">Name</Label>
            <Input id="ghouseName" type="ghouseName" value={ghouseName} onChange={(e) => setGhouseName(e.target.value)} 
            placeholder="이름을 입력해주세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ghouseContent">Content</Label>
            <Input id="ghouseContent" type="ghouseContent" value={ghouseContent} onChange={(e) => setGhouseContent(e.target.value)} 
            placeholder="설명을 입력해주세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ghouseImages">Images</Label>
            <input type="file" multiple={true} id="fileUpload" />
          </div>
          <Button className="w-full">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}
