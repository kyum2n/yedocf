// components/Header.jsx
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
    return (
        <header className=" px-4 shadow-md bg-white text-black flex justify-between items-center">
            <h1 className="text-2xl font-bold"><Link to="/">연세 BT 미래병원</Link></h1>
            <nav>
                <ul className="flex">
                    <li className="navList px-20 py-5"><a href="#" className="text-lg font-bold">코</a>
                        <ul>
                            <li><a href="#">콧대성형</a></li>
                            <li><a href="#">매부리코 성형</a></li>
                            <li><a href="#">복코 교정</a></li>
                            <li><a href="#">코끝 성형</a></li>
                            <li><a href="#">콧볼 축소</a></li>
                        </ul>
                    </li>
                    <li className="navList px-20 py-5"><a href="#" className="text-lg font-bold">눈</a>
                        <ul>
                            <li><a href="#">쌍커풀</a></li>
                            <li><a href="#">비절개 쌍커풀</a></li>
                            <li><a href="#">앞트임</a></li>
                            <li><a href="#">뒤트임</a></li>
                            <li><a href="#">밑트임</a></li>
                            <li><a href="#">눈매교정</a></li>
                            <li><a href="#">지방재배치</a></li>
                            <li><a href="#">다크서클 미백</a></li>
                        </ul>
                    </li>
                    <li className="navList px-20 py-5"><a href="#" className="text-lg font-bold">윤곽</a>
                        <ul>
                            <li><a href="#">광대축소술</a></li>
                            <li><a href="#">사각턱 수술</a></li>
                            <li><a href="#">V라인 턱끝 성형</a></li>
                            <li><a href="#">양악 수술</a></li>
                            <li><a href="#">이중턱 지방흡입</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="flex space-x-4">
                {isLoggedIn ? (
                    <>
                        <Link to="/mypage" className="hover:underline">마이페이지</Link>
                        <button className="hover:underline">로그아웃</button>
                    </>
                ) : (
                    <Link to="/login" className="hover:underline">로그인</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
