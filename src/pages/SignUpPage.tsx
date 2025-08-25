// src/pages/SignUpPage.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { endpointIp } from "@/data/Endpoint"
import axios from 'axios'

const passwordRule =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'\",.<>/?\\|`~]).{8,16}$/

const schema = z.object({
  email: z.string().email("이메일이 존재하지 않습니다"),
  password: z
    .string()
    .regex(passwordRule, "8~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요"),
  confirmPassword: z.string(),
  name: z.string().min(2, "이름은 최소 2자 이상 입력해주세요"),
  phoneNumber: z
    .string()
    .min(9, "전화번호를 입력해주세요")
    .regex(/^[0-9\-+\s()]+$/, "숫자와 - 만 입력 가능합니다"),
}).refine(v => v.password === v.confirmPassword, {
  path: ["confirm"],
  message: "비밀번호가 일치하지 않습니다",
})

type FormData = z.infer<typeof schema>

export async function registerUser(data: FormData) {
  const res = await axios.post('http://'+ endpointIp + ':8080/auth/signup', data)
  return res.data
}

export async function checkEmailDuplication(email: string): Promise<boolean> {
  try {
    const res = await axios.get(`http://${endpointIp}:8080/auth/signup/checkemail?email=${email}`)
    return !res.data.exists
  } catch (err) {
    console.error("이메일 중복 확인 실패", err)
    return false
  }
}

export default function SignUpPage() {
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [emailChecked, setEmailChecked] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const watchedEmail = watch("email")

  useEffect(() => {
    setEmailChecked(false)
  }, [watchedEmail])

  const onCheckEmail = async () => {
    const email = getValues("email")
    if (!email) {
      alert("이메일을 입력해주세요.")
      return
    }
    const available = await checkEmailDuplication(email)
    if (!available) {
      alert("이미 존재하는 이메일입니다.")
      setEmailChecked(false)
    } else {
      alert("사용 가능한 이메일입니다.")
      setEmailChecked(true)
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!emailChecked) {
      alert("이메일 중복 확인을 먼저 해주세요.")
      return
    }
    try {
      const res = await registerUser(data)
      console.log('가입 완료', res)
      alert("계정이 생성되었습니다! 🎉")
      navigate("/")
    } catch (err) {
      console.error('회원가입 실패', err)
      alert("회원가입에 실패했습니다.")
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-background">
      <div className="w-full max-w-md px-6 pt-10 pb-16">
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="air sds logo" className="h-30 w-auto" />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-[1fr_130px] gap-3">
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
            <Button type="button" variant="secondary" onClick={onCheckEmail}>
              {emailChecked ? "확인됨" : "중복체크"}
            </Button>
          </div>

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

          <div className="space-y-1">
            <Label htmlFor="confirm" className="sr-only">비밀번호 재확인</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showPw2 ? "text" : "password"}
                placeholder="비밀번호 재확인"
                {...register("confirmPassword")}
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
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="name" className="sr-only">이름</Label>
            <Input id="name" placeholder="이름 입력" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="sr-only">전화번호</Label>
            <Input id="phone" placeholder="전화번호 입력" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            생성
          </Button>
        </form>
      </div>
    </div>
  )
}
