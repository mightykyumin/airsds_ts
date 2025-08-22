console.log("✅ RoomDetailPage 렌더링됨");


import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/DateRangePicker/DateRangePicker";
import { endpointIp } from "@/data/Endpoint";
import type {
  RoomDetailResponse,
  Ghouse,
  Review,
  GhouseImage,
  BookingDay,
} from "@/data/types";

/* calender size 조정용 */
function useMedia(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* -------------------- 유틸 -------------------- */
function formatKorean(date?: Date) {
  if (!date) return "날짜 선택";
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}. ${m}. ${d}.`;
}

/* ===========================================================
   RoomDetailPage
=========================================================== */
export default function RoomDetailPage() {
  const { roomId } = useParams<{ roomId: string }>(); // URL param (== ghouseId)
  const navigate = useNavigate();

  // 상태
  const [room, setRoom] = useState<Ghouse | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [images, setImages] = useState<GhouseImage[]>([]);
  const [bookingDays, setBookingDays] = useState<BookingDay[]>([]);
  const [loading, setLoading] = useState(true);

  // 체크인-체크아웃 날짜 range 선택
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  // API 호출
  useEffect(() => {
  console.log("RoomDetail useEffect 실행됨, roomId:", roomId)
  if (!roomId) return;

  const fetchDetail = async () => {
    try {
      const res = await axios.get<RoomDetailResponse>(
        `http://${endpointIp}:8080/ghouse/${roomId}`
      );

      console.log("ghouse 응답:", res.data);

      setRoom(res.data.ghouse);
      setReviews(res.data.reviews);
      setImages(res.data.ghouseImages);
      setBookingDays(res.data.bookingDays);
    } catch (err) {
      console.error("숙소 상세 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDetail();
}, [roomId]);



  // 이미지 5개 확보 (기존 로직 유지)
  const imageUrls = useMemo(() => {
    const arr = images.map((img) => img.imageUrl);
    const first = arr[0] ?? "";
    return [arr[0] ?? first, arr[1] ?? first, arr[2] ?? first, arr[3] ?? first, arr[4] ?? first];
  }, [images]);

  const nights = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return Math.round(
      (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [range]);

  const [galleryOpen, setGalleryOpen] = useState(false);

  if (loading) return <div className="p-6">불러오는 중...</div>;
  if (!roomId) return <div className="p-6">잘못된 접근입니다.</div>;
  if (!room) return <div className="p-6">존재하지 않는 숙소입니다.</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* 헤더 */}
      <header className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{room.title}</h1>
        <div className="flex items-center gap-2" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측: 이미지 + 설명 */}
        <section className="lg:col-span-8">
          {/* 모자이크 */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="h-[300px] md:h-[420px] lg:h-[560px] grid grid-cols-4 grid-rows-2 gap-2 md:gap-3 lg:gap-4">
              <div className="col-span-2 row-span-2">
                <img
                  src={imageUrls[0]}
                  alt={`${room.title} 메인 이미지`}
                  className="w-full h-full object-cover"
                />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col-span-1 row-span-1">
                  <img
                    src={imageUrls[i]}
                    alt={`${room.title} 썸네일 ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* 사진 모두 보기 */}
            <button
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-sm shadow hover:bg-white"
              onClick={() => setGalleryOpen(true)}
            >
              ▦ 사진 모두 보기
            </button>
          </div>

          {/* 숙소 설명 */}
          <div className="mt-6">
            <div className="text-gray-600">{room.location}</div>
            <p className="mt-4 text-gray-700">{room.content}</p>
          </div>

          {/* 리뷰 */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">리뷰</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">아직 리뷰가 없습니다.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {reviews.map((rev) => (
                  <li key={rev.reviewId} className="border p-3 rounded-lg text-sm">
                    ⭐ {rev.rating}점 · {rev.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 우측: 예약창 */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border p-5 shadow-sm bg-white">
            <div className="flex items-end justify-between">
              <div className="text-2xl font-semibold">
                ₩{room.price.toLocaleString()}{" "}
                <span className="text-base font-normal">/박</span>
              </div>
              {nights > 0 && (
                <div className="text-sm text-gray-600">
                  {nights}박 · 총 ₩{(room.price * nights).toLocaleString()}
                </div>
              )}
            </div>
            {/* DateRangePicker 컴포넌트 끌어와서 사용 */}
            <div className="mt-4">
              <DateRangePicker
                value={range}
                onChange={setRange}
                className="w-full"
              />
            </div>

            <Button
              className="mt-4 w-full bg-primary text-black px-6 py-3 rounded-xl hover:bg-primary/90"
              onClick={() => {
                if (!range?.from || !range.to)
                  return alert("체크인/체크아웃을 선택하세요.");
                if (nights <= 0)
                  return alert("체크아웃은 체크인 이후 날짜여야 합니다.");
                navigate(`/rooms/${room.ghouseId}/reserve-success`);
              }}
            >
              예약하기
            </Button>

            <button
              className="mt-3 w-full px-6 py-3 rounded-xl text-blue-600 hover:underline"
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </button>
          </div>
        </aside>
      </div>

      {/* 사진 갤러리 모달 */}
      {galleryOpen && (
        <GalleryModal images={imageUrls.filter(Boolean)} onClose={() => setGalleryOpen(false)} />
      )}
    </div>
  );
}

/** -------- 갤러리 모달 컴포넌트 -------- */
function GalleryModal({
  images,
  onClose,
  initialIndex = 0,
}: {
  images: string[];
  onClose: () => void;
  initialIndex?: number;
}) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [images.length, onClose]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 mx-auto max-w-6xl h-full flex flex-col p-4">
        {/* 상단 바 */}
        <div className="flex items-center justify-between text-white mb-3">
          <span className="text-sm">
            {index + 1} / {images.length}
          </span>
          <button className="p-2 rounded hover:bg-white/10" onClick={onClose} aria-label="닫기">
            <X />
          </button>
        </div>

        {/* 메인 이미지 */}
        <div className="flex-1 relative flex items-center justify-center">
          <img
            src={images[index]}
            alt={`gallery-${index}`}
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow"
          />
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/90 hover:bg-white shadow"
            onClick={prev}
            aria-label="이전"
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/90 hover:bg-white shadow"
            onClick={next}
            aria-label="다음"
          >
            <ChevronRight />
          </button>
        </div>

        {/* 메인 이미지 밑에 레일 형태로 나머지 이미지 보기 (갤러리 모달) */}
        <div className="mt-3 -mx-4 flex overflow-x-auto gap-0">
          {images.map((src, i) => (
            <div
              key={i}
              role="button"
              onClick={() => setIndex(i)}
              className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-none m-0 p-0 cursor-pointer"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }}
              aria-label={`썸네일 ${i + 1}`}
            >
              <img
                src={src}
                alt={`thumb-${i}`}
                draggable={false}
                className={`h-full w-full object-cover select-none ${
                  i === index ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
