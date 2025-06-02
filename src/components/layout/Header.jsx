import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from '@/constants/menuItems';
import axios from 'axios';

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);

            axios.post(
                '/api/user/info',
                {}, // POST 본문이 필요 없다면 빈 객체
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then((res) => {
                    setUsername(res.data.uName); // ← 백엔드에서 보내는 실제 필드명에 맞춰야 해!
                })
                .catch((err) => {
                    console.error('사용자 정보 가져오기 실패:', err);
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/login');
    };

    const getMenuLabel = (key) => {
        switch (key) {
            case 'eye': return '눈';
            case 'nose': return '코';
            case 'face': return '윤곽';
            default: return key;
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-16">
                <div className="flex justify-between items-center">
                    {/* 로고 */}
                    <Link to="/">
                        <h1 className="text-xl font-bold h-16 px-4 flex items-center">
                            연세 BT 미래병원
                        </h1>
                    </Link>

                    {/* 네비게이션 */}
                    <nav className="absolute-center flex gap-1">
                        <Link to="/?scrollTo=directions" className="h-16 px-14 text-lg font-bold flex-center">
                            오시는 길
                        </Link>
                        {Object.keys(menuItems).map((key) => (
                            <Link to={`/${key}`} key={key}>
                                <button
                                    type="button"
                                    className="h-16 px-14 text-lg font-bold flex-center"
                                    onMouseEnter={() => setActiveMenu(key)}
                                >
                                    {getMenuLabel(key)}
                                </button>
                            </Link>
                        ))}
                    </nav>

                    {/* 로그인 / 예약 */}
                    <div className="flex gap-2 items-center">
                        {isLoggedIn ? (
                            <>
                                <span className="h-16 flex items-center p-4">{username}님 안녕하세요</span>
                                <button onClick={handleLogout} className="h-16 flex items-center p-4">로그아웃</button>
                            </>
                        ) : (
                            <Link to="/login" className="h-16 flex items-center p-4">로그인</Link>
                        )}
                        <Link
                            to={isLoggedIn ? "/reserve" : "/login"}
                            className="h-12 flex items-center px-8 mr-3 border border-black hover:bg-pink-50"
                        >
                            예약하기
                        </Link>
                    </div>
                </div>
            </header>

            {/* 서브메뉴 */}
            {activeMenu && (
                <div
                    onMouseEnter={() => setActiveMenu(activeMenu)}
                    onMouseLeave={() => setActiveMenu(null)}
                    className="fixed top-[60px] left-0 w-full max-h-60 overflow-y-auto bg-white shadow z-40 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                    <ul className="flex justify-center gap-8 px-6">
                        {menuItems[activeMenu].map(({ title, tab }) => (
                            <li key={tab} className="hover:bg-slate-100 hover:underline py-1">
                                <Link
                                    to={`/${activeMenu}?tab=${tab}`}
                                    className="h-12 px-4 flex-center text-sm whitespace-nowrap"
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Header;
