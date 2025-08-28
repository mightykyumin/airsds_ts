import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import RoomDetailPage from "../pages/RoomDetail/RoomDetailPage.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import BookingCompletePage from "@/pages/BookingCompletePage.tsx";
import AppWithLanding from "@/AppWithLanding.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppWithLanding />} />
        <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
        <Route path="/signup" element = {<SignUpPage />} />
        <Route path="/booking/complete" element={<BookingCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}
