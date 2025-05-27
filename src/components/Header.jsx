import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, username }) => {
    // 로그인 상태와 사용자 이름을 props로 받습니다.
    // isLoggedIn: 로그인 여부 (boolean)
    const [activeMenu, setActiveMenu] = useState(null);
    // activeMenu: 현재 활성화된 메뉴 (nose, eye, face 중 하나 또는 null)
    // setActiveMenu: 메뉴를 변경하는 함수

    const menuItems = {
        nose: [
            { title: '콧대성형', tab: '1' },
            { title: '매부리코 성형', tab: '2' },
            { title: '복코 교정', tab: '3' },
            { title: '코끝 성형', tab: '4' },
            { title: '콧볼 축소', tab: '5' }
        ],
        eye: [
            { title: '쌍커풀', tab: '1' },
            { title: '비절개 쌍커풀', tab: '2' },
            { title: '앞트임', tab: '3' },
            { title: '뒤트임', tab: '4' },
            { title: '밑트임', tab: '5' },
            { title: '눈매교정', tab: '6' },
            { title: '지방재배치', tab: '7' },
            { title: '다크서클 제거', tab: '8' }
        ],
        face: [
            { title: '광대축소술', tab: '1' },
            { title: '사각턱 수술', tab: '2' },
            { title: 'V라인 턱끝 성형', tab: '3' },
            { title: '양악수술', tab: '4' },
            { title: '이중턱 지방흡입', tab: '5' },
        ]
    };
    // 서브메뉴 항목들을 객체로 정의하여 각 메뉴에 해당하는 시술 목록을 관리합니다.
    // title:항목 이름 tab: 시술 목록 탭 구분용
    // 서브메뉴 항목 추가 시에는 원하는 항목에 새로운 서브메뉴 항목을 같은 형식으로 추가하면 됩니다. 
    // 그 다음 서브메뉴 항목이 추가된 항목의 페이지의 탭을 추가하면 됩니다.
    // 하지만 새로운 항목 추가할 때는 새로 페이지를 만들어야 합니다.

    const handleLogout = () => {
        // 로그아웃 로직 (예: 토큰 삭제 등)
        console.log('로그아웃');
        // 실제 로그아웃 로직을 구현해야 합니다.
        // 예: localStorage.removeItem('token');
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-16">
                <div className="flex justify-between items-center">
                    <Link to="/"><h1 className="text-xl font-bold h-16 px-4 flex items-center">연세 BT 미래병원</h1></Link>
                    {/* 왼쪽에 들어가는 홈 버튼 */}

                    <nav className="absolute-center flex gap-1">
                        <Link to="/nose">
                            <button type='button' className='h-16 px-14 text-lg font-bold flex-center' onMouseEnter={() => setActiveMenu('nose')}>코</button>
                        </Link>
                        <Link to="/eye">
                            <button type='button' className='h-16 px-14 text-lg font-bold flex-center' onMouseEnter={() => setActiveMenu('eye')}>눈</button>
                        </Link>
                        <Link to="/face">
                            <button type='button' className='h-16 px-14 text-lg font-bold flex-center' onMouseEnter={() => setActiveMenu('face')}>윤곽</button>
                        </Link>
                    </nav>
                    {/* 헤더 정 중앙에 들어가는 내비게이션 바(서브메뉴는 아래에 있습니다) */}

                    <div className="flex gap-2 items-center">
                        {isLoggedIn ? (
                            <>
                                <span className='h-16 flex items-center p-4'>{username}님 안녕하세요</span>
                                <button onClick={handleLogout} className='h-16 flex items-center p-4'>로그아웃</button>
                            </>
                        ) : (
                            <Link to="/login" className='h-16 flex items-center p-4'>로그인</Link>
                        )}
                        <Link to={isLoggedIn ? "/reserve" : "/login"} className='h-16 flex items-center p-4'>예약하기</Link>
                    </div>
                    {/* 오른쪽에 들어가는 버튼 묶음 */}
                </div>
            </header>

            {activeMenu && (
                <div
                    onMouseEnter={() => setActiveMenu(activeMenu)}
                    onMouseLeave={() => setActiveMenu(null)}
                    className="fixed top-[60px] left-0 w-full h-auto bg-white shadow z-40"
                >
                    <ul className="flex justify-center gap-8 shadow">
                        {menuItems[activeMenu].map(({ title, tab }) => (
                            <li key={tab} className='hover:bg-slate-100 hover:underline flex-center'>
                                <Link to={`/${activeMenu}?tab=${tab}`} className="h-12 px-4 flex-center text-sm whitespace-nowrap">{title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* 서브 메뉴가 활성화되면 해당 메뉴의 시술 목록을 보여주는 부분 */}
            {/* 가로 한줄로 나열됩니다. */}
        </>
    );
};

export default Header;
