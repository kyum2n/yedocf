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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <ScrollToTop />

      <Routes>
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
