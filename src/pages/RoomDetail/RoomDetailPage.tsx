import { useParams, useNavigate } from "react-router-dom";
import MOCK from "@/mock/listings";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const room = MOCK.flatMap(region => region.listings).find(
    (item) => String(item.id) === roomId
  );

  if (!room) return <div>존재하지 않는 숙소입니다.</div>;
  if (!roomId) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 상단 이미지 */}
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-64 md:h-80 object-cover"
        />

        {/* 하단 정보 */}
        <div className="p-6">
          <h2 className="text-2xl font-bold">{room.name}</h2>
          <div className="mt-1 text-gray-600">{room.location}</div>
          <div className="mt-2 text-lg font-semibold">
            ₩{room.price.toLocaleString()}/night
          </div>

          <p className="mt-4 text-gray-700">
            여기에 숙소에 대한 상세 설명을 추가할 수 있습니다.
          </p>

          {/* 풀폭 버튼들 */}
          <div className="mt-6 flex gap-3">
            <button className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
              예약하기
            </button>
            <button
              className="whitespace-nowrap px-6 py-3 rounded-md text-blue-600 hover:underline"
              onClick={() => navigate(-1)}
            >
              ← 뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
