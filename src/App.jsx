// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DirectionsMap from "./components/DirectionsMap";

import LoginPage from "./pages/LoginPage";
import EyePage from "./pages/EyePage";
import NosePage from "./pages/NosePage";
import FacePage from "./pages/FacePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={<div className="mt-16" >메인 페이지입니다</div>} />
        <Route path="/mypage" element={<DirectionsMap></DirectionsMap>} />
        <Route path="/eye" element={<EyePage />} />
        <Route path="/nose" element={<NosePage />} />
        <Route path="/face" element={<FacePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
