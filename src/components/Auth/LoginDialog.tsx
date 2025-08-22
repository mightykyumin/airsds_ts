import { useState } from "react"

import { Link } from "react-router-dom"
import { LogIn } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function LoginDialog() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <LogIn className="h-4 w-4" />
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>AIRSDS</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="airsds@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button className="w-full">로그인</Button>
          <div className="text-center text-sm text-muted-foreground">계정이 없으신가요?&nbsp;
           <Link to="/signup" className="underline underline-offset-4">
            회원가입
          </Link></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
