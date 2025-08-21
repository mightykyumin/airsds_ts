import { useParams, useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import MOCK from "@/mock/listings";
import ImageMosaic from "@/components/ui/image-mosaic";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const room = useMemo(
    () =>
      MOCK.flatMap((region) => region.listings).find(
        (item) => String(item.id) === roomId
      ),
    [roomId]
  );

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!roomId) return <div>잘못된 접근입니다.</div>;
  if (!room) return <div>존재하지 않는 숙소입니다.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
        <div className="w-full">
          <div className="w-full rounded-2xl overflow-hidden border">
            <img
              src={room.image}
              alt={room.name}
              className="block w-full h-auto max-h-[700px] object-contain bg-black/5"
            />
          </div>

          <div className="mt-5">
            <h1 className="text-2xl md:text-3xl font-bold">{room.name}</h1>
            <div className="mt-1 text-gray-600">{room.location}</div>
            <div className="mt-2 text-xl font-semibold">
              ₩{room.price.toLocaleString()}/night
            </div>
            <p className="mt-4 text-gray-700">
              여기에 숙소에 대한 상세 설명을 추가할 수 있습니다.
            </p>
          </div>
        </div>

        <aside className="w-full">
          <div className="rounded-2xl border p-5 shadow-sm">
            <div className="text-lg font-semibold mb-3">체크인 / 체크아웃</div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-600">체크인</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">체크아웃</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
            </div>

            <button className="mt-5 w-full bg-primary text-black px-6 py-3 rounded-xl hover:bg-primary/90">
              예약하기
            </button>

            <button
              className="mt-3 w-full px-6 py-3 rounded-xl text-blue-600 hover:underline"
              onClick={() => navigate("/")}
            >
              홈으로 돌아가기
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
