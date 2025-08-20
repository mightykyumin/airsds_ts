// src/pages/SignUpPage.tsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

const passwordRule =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,16}$/

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력하세요."),
  code: z.string().min(4, "인증번호 4자리 이상").max(8, "인증번호가 너무 깁니다."),
  password: z
    .string()
    .regex(passwordRule, "8~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요."),
  confirm: z.string(),
  name: z.string().min(2, "이름은 2자 이상"),
  phone: z
    .string()
    .min(9, "전화번호를 입력하세요.")
    .regex(/^[0-9\-+\s()]+$/, "숫자와 - 만 입력 가능"),
}).refine(v => v.password === v.confirm, {
  path: ["confirm"],
  message: "비밀번호가 일치하지 않습니다.",
})

type FormData = z.infer<typeof schema>

export default function SignUpPage() {
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [sent, setSent] = useState(false)
  const [verified, setVerified] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSendCode = async () => {
    setSent(true)
    // TODO: 서버에 이메일 전송 API 호출
    alert("인증번호를 전송했습니다. (데모)")
  }

  const onVerify = async () => {
    // TODO: 서버에 인증번호 검증 API 호출
    setVerified(true)
    alert("인증이 완료되었습니다. (데모)")
  }

  const onSubmit = async (data: FormData) => {
    // TODO: 회원가입 API 연결
    console.log("sign up:", data)
    alert("계정이 생성되었습니다! 🎉 (데모)")
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-background">
      <div className="w-full max-w-md px-6 pt-10 pb-16">
        {/* 로고 */}
        <div className="flex items-center justify-center mb-6">
            <Link to="/" className="flex items-center gap-2">
                <img 
                src="/logo.png"   // 로고 파일 경로 (public 폴더에 logo.png 넣어두면 됨)
                alt="air sds logo" 
                className="h-30 w-auto" 
                />
            </Link>
            </div>


        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* 이메일 + 인증 전송 */}
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div className="space-y-1">
              <Label htmlFor="email" className="sr-only">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <Button type="button" variant="secondary" onClick={onSendCode}>
              {sent ? "재전송" : "인증번호 전송"}
            </Button>
          </div>

          {/* 인증번호 + 확인 */}
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div className="space-y-1">
              <Label htmlFor="code" className="sr-only">인증번호</Label>
              <Input
                id="code"
                placeholder="인증번호 입력"
                {...register("code")}
              />
              {errors.code && (
                <p className="text-xs text-destructive">{errors.code.message}</p>
              )}
            </div>
            <Button type="button" variant={verified ? "default" : "secondary"} onClick={onVerify}>
              {verified ? "확인됨" : "인증번호 확인"}
            </Button>
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1">
            <Label htmlFor="password" className="sr-only">비밀번호</Label>
            <div className="relative">
                <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    {...register("password")}
                />
                <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPw((p) => !p)}
                    aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                </div>

            <p className="text-[11px] text-muted-foreground">
              8~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요
            </p>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 재확인 */}
          <div className="space-y-1">
            <Label htmlFor="confirm" className="sr-only">비밀번호 재확인</Label>
           <div className="relative">
            <Input
                id="confirm"
                type={showPw2 ? "text" : "password"}
                placeholder="비밀번호 재확인"
                {...register("confirm")}
            />
            <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPw2((p) => !p)}
                aria-label={showPw2 ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
                {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            </div>

            {errors.confirm && (
              <p className="text-xs text-destructive">{errors.confirm.message}</p>
            )}
          </div>

          {/* 이름 */}
          <div className="space-y-1">
            <Label htmlFor="name" className="sr-only">이름</Label>
            <Input id="name" placeholder="이름 입력" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* 전화번호 */}
          <div className="space-y-1">
            <Label htmlFor="phone" className="sr-only">전화번호</Label>
            <Input id="phone" placeholder="전화번호 입력" {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* 생성 버튼 */}
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            생성
          </Button>
        </form>
      </div>
    </div>
  )
}
