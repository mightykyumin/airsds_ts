import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share2, Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import MOCK from "@/mock/listings";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // 기존 로직 그대로
  const room = useMemo(
    () =>
      MOCK.flatMap((region) => region.listings).find(
        (item) => String(item.id) === roomId
      ),
    [roomId]
  );

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // 모자이크/모달에서 쓸 이미지 5칸 확보
  const images = useMemo(() => {
    const arr = Array.isArray(room?.image)
      ? (room!.image as string[])
      : room?.image
      ? [room.image as string]
      : [];
    const first = arr[0] ?? "";
    return [arr[0] ?? first, arr[1] ?? first, arr[2] ?? first, arr[3] ?? first, arr[4] ?? first];
  }, [room]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const [galleryOpen, setGalleryOpen] = useState(false);

  if (!roomId) return <div className="p-6">잘못된 접근입니다.</div>;
  if (!room) return <div className="p-6">존재하지 않는 숙소입니다.</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* 헤더 */}
      <header className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{room.name}</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Share2 size={16} />
            <span className="text-sm">공유하기</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Heart size={16} />
            <span className="text-sm">저장</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측: 이미지 + 설명 */}
        <section className="lg:col-span-8">
          {/* 모자이크 */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="h-[300px] md:h-[420px] lg:h-[560px] grid grid-cols-4 grid-rows-2 gap-2 md:gap-3 lg:gap-4">
              <div className="col-span-2 row-span-2">
                <img
                  src={images[0]}
                  alt={`${room.name} 메인 이미지`}
                  className="w-full h-full object-cover"
                />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col-span-1 row-span-1">
                  <img
                    src={images[i]}
                    alt={`${room.name} 썸네일 ${i}`}
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

          {/* 이미지 아래 텍스트 */}
          <div className="mt-6">
            <div className="text-gray-600">{room.location}</div>
            <p className="mt-4 text-gray-700">
              여기에 숙소에 대한 상세 설명을 추가할 수 있습니다. 편의시설, 주변 교통, 하우스
              룰 등을 적어주세요.
            </p>
          </div>
        </section>

        {/* 우측: 예약 카드 */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border p-5 shadow-sm bg-white">
            <div className="flex items-end justify-between">
              <div className="text-2xl font-semibold">
                ₩{room.price.toLocaleString()} <span className="text-base font-normal">/박</span>
              </div>
              {nights > 0 && (
                <div className="text-sm text-gray-600">
                  {nights}박 · 총 ₩{(room.price * nights).toLocaleString()}
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-gray-600">체크인</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs text-gray-600">체크아웃</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </label>
            </div>

            <button
              className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90"
              onClick={() => {
                if (!checkIn || !checkOut) return alert("체크인/체크아웃을 선택하세요.");
                if (nights <= 0) return alert("체크아웃은 체크인 이후 날짜여야 합니다.");
                navigate(`/rooms/${room.id}/reserve-success`);
              }}
            >
              예약하기
            </button>

            <button
              className="mt-3 w-full px-6 py-3 rounded-xl text-blue-600 hover:underline"
              onClick={() => navigate(-1)}
            >
              ← 뒤로가기
            </button>
          </div>
        </aside>
      </div>

      {/* 사진 갤러리 모달 */}
      {galleryOpen && (
        <GalleryModal
          images={images.filter(Boolean)}
          onClose={() => setGalleryOpen(false)}
        />
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
    // ESC/좌우 화살표, 스크롤 잠금
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
          <button
            className="p-2 rounded hover:bg-white/10"
            onClick={onClose}
            aria-label="닫기"
          >
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

        {/* 썸네일 */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative h-20 w-28 flex-shrink-0 rounded overflow-hidden ring-2 ${
                i === index ? "ring-white" : "ring-transparent"
              }`}
              aria-label={`썸네일 ${i + 1}`}
            >
              <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
