import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import RoomDetailPage from "../pages/RoomDetail/RoomDetailPage.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
        <Route path="/signup" element = {<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
