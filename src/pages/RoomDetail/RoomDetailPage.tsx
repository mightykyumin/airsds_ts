import { useParams, useNavigate } from "react-router-dom";
import MOCK from "@/mock/listings";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // roomId로 해당 숙소 찾기
  const room = MOCK.flatMap(region => region.listings).find(
    (item) => String(item.id) === roomId
  );

  if (!room) {
    return <div>존재하지 않는 숙소입니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <button
        className="mb-4 text-blue-500 underline"
        onClick={() => navigate(-1)}
      >
        ← 뒤로가기
      </button>
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img src={room.image} alt={room.name} className="w-full h-72 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
          <div className="text-gray-600 mb-2">{room.location}</div>
          <div className="text-lg font-semibold mb-4">₩{room.price.toLocaleString()}/night</div>
          <p className="mb-6">여기에 숙소에 대한 상세 설명을 추가할 수 있습니다.</p>
          <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90">
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}