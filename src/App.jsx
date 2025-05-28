// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import LoginPage from "./pages/user/LoginPage";
import EyePage from "./pages/user/EyePage";
import NosePage from "./pages/user/NosePage";
import FacePage from "./pages/user/FacePage";
import SignupPage from "./pages/user/SignupPage";
import FindAccountPage from "./pages/user/FindAccountPage";
import MyPage from "./pages/user/MyPage";
import ReservationPage from "./pages/user/ReservationPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={<div className="mt-16" >메인 페이지입니다</div>} />
        <Route path="/eye" element={<EyePage />} />
        <Route path="/nose" element={<NosePage />} />
        <Route path="/face" element={<FacePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/idpwfind" element={<FindAccountPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
