import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ScrollToTop from './components/common/ScrollToTop';
import UserLayout from './components/layout/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import UserManagePage from './pages/admin/UserManagePage';
import ReservationManagePage from './pages/admin/ReservationManagePage';
import StaffManagePage from './pages/admin/StaffManagePage';
import TestUserList from './pages/test/TestUserList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔗 백엔드 연결 확인용 테스트 (React가 Spring Boot랑 통신 잘 되는지 확인)
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/hello') // HelloController가 만든 API
      .then((res) => {
        console.log('[백엔드 연결 성공]', res.data);
      })
      .catch((err) => {
        console.error('[백엔드 연결 실패]', err);
      });
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* 테스트 페이지 라우트 추가 */}
        <Route path="/test/users" element={<TestUserList />} />

        {/* 관리자 로그인 */}
        <Route path="/adminlogin" element={<AdminLoginPage />} />

        {/* 관리자 레이아웃 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<UserManagePage />} />
          <Route path="reservations" element={<ReservationManagePage />} />
          <Route path="staff" element={<StaffManagePage />} />
        </Route>

        {/* 사용자 레이아웃 */}
        <Route
          path="/*"
          element={<UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
