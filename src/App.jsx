// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import DirectionsMap from "./components/DirectionsMap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        {/* 다른 페이지들 라우팅 추가 예정 */}
        <Route path="/" element={<><div >메인 페이지입니다</div>
          <img src="https://placehold.co/600x2000"></img></>} />
        <Route path="/mypage" element={<DirectionsMap></DirectionsMap>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
