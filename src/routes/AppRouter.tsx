import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import RoomDetailPage from "../pages/RoomDetail/RoomDetailPage.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}