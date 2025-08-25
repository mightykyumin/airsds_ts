// src/pages/BookingCompletePage.tsx
import '../index.css'
"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
export default function ReservationComplete() {

    const navigate = useNavigate() 
    const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* 메인 컨텐츠 */}
      <div className="text-center px-8">
        {/* 성공 아이콘 */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-[bounce_1s_ease-in-out_infinite]">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* 메인 메시지 */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">예약 완료!</h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-2">예약이 성공적으로 완료되었습니다</p>

        <p className="text-lg text-gray-600 mb-12">확인 메일을 확인해주세요 ✉️</p>

        {/* 홈으로 돌아가기 버튼 */}
        <Button
          onClick={handleGoHome}
          size="lg"
          className="text-xl px-12 py-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          🏠 홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
