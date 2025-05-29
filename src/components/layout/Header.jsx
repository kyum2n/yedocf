import { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '@/constants/menuItems';

const Header = ({ isLoggedIn, username }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    const handleLogout = () => {
        console.log('로그아웃');
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-16">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <h1 className="text-xl font-bold h-16 px-4 flex items-center">
                            연세 BT 미래병원
                        </h1>
                    </Link>

                    <nav className="absolute-center flex gap-1">
                        <Link to="/?scrollTo=directions" className="h-16 px-14 text-lg font-bold flex-center">오시는 길</Link>
                        {Object.keys(menuItems).map((menuKey) => (
                            <Link to={`/${menuKey}`} key={menuKey}>
                                <button
                                    type="button"
                                    className="h-16 px-14 text-lg font-bold flex-center"
                                    onMouseEnter={() => setActiveMenu(menuKey)}
                                >
                                    {menuKey === 'nose' ? '코' : menuKey === 'eye' ? '눈' : '윤곽'}
                                </button>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-2 items-center">
                        {isLoggedIn ? (
                            <>
                                <span className="h-16 flex items-center p-4">{username}님 안녕하세요</span>
                                <button onClick={handleLogout} className="h-16 flex items-center p-4">
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="h-16 flex items-center p-4">
                                로그인
                            </Link>
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
