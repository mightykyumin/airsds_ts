import { useParams } from "react-router-dom";

export default function RoomDetailPage() {
  const { roomId } = useParams();

  return (
    <div>
      <h2>숙소 상세 페이지 (ID: {roomId})</h2>
      {/* 상세 정보, 이미지, 예약 버튼 등 원하는 디자인 추가 */}
    </div>
  );
}