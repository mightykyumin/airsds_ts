import { useState } from "react"
import { Home, Plus } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { HostingData } from "@/data/types"
import axios from "axios"
import { endpointIp } from "@/data/Endpoint"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function HostingDialog() {
  const userId =  Number(localStorage.getItem("userId"))
  const [ghouseAddress, setGhouseAddress] = useState("")
  const [ghouseLocation, setGhouseLocation] = useState("")
  const [ghousPrice, setGhousPrice] = useState("")
  const [ghouseTitle, setGhouseTitle] = useState("")
  const [ghouseContent, setGhouseContent] = useState("")
  const [ghouseImages, setGhouseImages] = useState<string[]>([""]) // 이미지 URL 배열

  const [open, setOpen] = useState(false) 

  const handleImageChange = (index: number, value: string) => {
    const updated = [...ghouseImages]
    updated[index] = value
    setGhouseImages(updated)
  }

  const addImageField = () => {
    setGhouseImages([...ghouseImages, ""])
  }

  const removeImageField = (index: number) => {
    setGhouseImages(ghouseImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    // 입력된 이미지들에서 공백 제거 + 빈 문자열 필터링
    const cleanedImages = ghouseImages
      .map((url) => url.trim())
      .filter((url) => url.length > 0)

    // 2. 필수 입력값 검사
  if (
    !ghouseTitle.trim() ||
    !ghouseLocation.trim() ||
    !ghouseAddress.trim() ||
    !ghousPrice.trim() ||
    !ghouseContent.trim() ||
    cleanedImages.length === 0
  ) {
    alert("모든 필수 항목을 입력해주세요.")
    return
  }

    const data: HostingData = {
      userId,
      address: ghouseAddress,
      location: ghouseLocation,
      price: ghousPrice,
      title: ghouseTitle,
      content: ghouseContent,
      imageUrl: cleanedImages,
    }


    try {
      console.log("서버 요청:", data)
      const res = await axios.post('http://' + endpointIp + ':8080/ghouse/upload',data)
      console.log("서버 응답:", res.data)
      alert("숙소 등록 완료!")
      // 필요하면 여기서 상태 초기화 가능
      setOpen(false)
      // window.location.reload()
    } catch (err) {
      console.error("서버 요청 실패:", err)
      alert("숙소 등록 실패")
    } 
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Home className="h-4 w-4" />
          숙소 등록하기
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>숙소를 등록해주세요</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ghouseTitle">숙소이름</Label>
            <Input id="ghouseTitle" value={ghouseTitle} onChange={(e) => setGhouseTitle(e.target.value)} placeholder="이름을 입력해주세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ghouseLocation">숙소위치</Label>
            <Select value={ghouseLocation} onValueChange={(value) => setGhouseLocation(value)}>
              <SelectTrigger id="ghouseLocation" className="w-full">
                <SelectValue placeholder="지역을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="서울">서울</SelectItem>
                <SelectItem value="부산">부산</SelectItem>
                <SelectItem value="제주">제주</SelectItem>
              </SelectContent>
            </Select>

          </div>
          <div className="space-y-2">
            <Label htmlFor="ghouseAddress">숙소상세위치</Label>
            <Input id="ghouseAddress" value={ghouseAddress} onChange={(e) => setGhouseAddress(e.target.value)} placeholder="도로명 주소를 입력해주세요" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ghousPrice">가격</Label>
            <Input id="ghousPrice" value={ghousPrice} onChange={(e) => setGhousPrice(e.target.value)} placeholder="하루 숙박 가격을 입력해주세요" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ghouseContent">설명</Label>
            <Input id="ghouseContent" value={ghouseContent} onChange={(e) => setGhouseContent(e.target.value)} placeholder="설명을 입력해주세요" />
          </div>

          {/* 이미지 URL 입력 (동적 추가 가능) */}
          <div className="space-y-2">
            <Label>이미지</Label>
            {ghouseImages.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`이미지 URL ${index + 1}`}
                />
                {ghouseImages.length > 1 && (
                  <Button
                    variant="destructive"
                    className="text-[0px] leading-none font-semibold px-1 py-0.5 rounded bg-blue-500 text-black hover:bg-blue-600"
                    onClick={() => removeImageField(index)}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addImageField} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> 이미지 추가
            </Button>
          </div>

          <Button className="w-full" onClick={handleSubmit}>등록하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}