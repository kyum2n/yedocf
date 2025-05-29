import { NavLink } from 'react-router-dom';

const Sidebar = ({ isLoggedIn = false, isSuperAdmin = false, adminName = '' }) => {
  return (
    <aside className="w-60 h-screen bg-[#3c2c29] text-white  fixed left-0 top-0 z-50 shadow-lg">
      {/* 상단 헤더 */}
      <div className="h-24 px-6 flex flex-col justify-center border-b border-[#503a36]">
        <span className="text-xl font-bold mb-1">BT관리자페이지</span>
        {isLoggedIn && (
          <span className="text-sm font-normal">{adminName}님 안녕하세요!</span>
        )}
      </div>

      {/* 사이드바 메뉴 */}
      <nav className="flex flex-col">
        {isLoggedIn ? (
          <>
            <SidebarLink to="/admin" label="사용자 관리" />
            <SidebarLink to="/admin/reservations" label="예약 관리" />
            {isSuperAdmin && <SidebarLink to="/admin/staff" label="직원 관리" />}
          </>
        ) : (
          <SidebarLink to="/adminlogin" label="관리자 로그인" />
        )}
      </nav>

      {/* 하단 버튼 */}
      <div className="absolute bottom-0 h-16 w-60 border-t border-[#503a36] flex-center">
        <button
          onClick={() => (window.location.href = '/')}
          className="h-16 w-60 text-center gap-2 text-sm hover:underline text-white"
        >
          <span>⏎</span> 로그아웃
        </button>
      </div>
    </aside>
  );
};

// NavLink 스타일 분리
const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    end={to === "/admin"} // 이게 핵심!
    className={({ isActive }) =>
      `px-4 py-3 text-sm font-medium transition-all ${
        isActive
          ? 'text-right font-bold bg-[#4b3733]'
          : 'text-left hover:bg-[#4b3733]'
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;
