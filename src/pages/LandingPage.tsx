// src/pages/LandingPage.tsx
import { useEffect } from "react"

type Props = { onFinish: () => void }

export function LandingPage({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="landing-page">
      <img
        src="https://wallpapers.com/images/hd/travel-hd-pi6mi8ghw8tpdtqu.jpg"
        alt="Landing Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold gowun-dodum">
          여행의 시작은 <br /> AIR SDS와 함께
        </h1>
        <p className="text-gray-200 text-lg md:text-xl gowun-dodum">
          2초 뒤 메인페이지로 이동합니다.
        </p>
      </div>
    </div>
  )
}
