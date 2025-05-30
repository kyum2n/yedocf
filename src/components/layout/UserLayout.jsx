import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from "react-router-dom";

import LoginPage from '@/pages/user/LoginPage';
import SignupPage from '@/pages/user/SignupPage';
import MainPage from '@/pages/user/MainPage';
import EyePage from '@/pages/user/EyePage';
import NosePage from '@/pages/user/NosePage';
import FacePage from '@/pages/user/FacePage';
import MyPage from '@/pages/user/MyPage';
import FindAccountPage from '@/pages/user/FindAccountPage';
import ReservationPage from '@/pages/user/ReservationPage';

const UserLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const hideFooterPaths = ["/"]; // MainPage 등

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/idpwfind" element={<FindAccountPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/eye" element={<EyePage />} />
        <Route path="/nose" element={<NosePage />} />
        <Route path="/face" element={<FacePage />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default UserLayout;
