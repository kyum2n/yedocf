// LoginPage.jsx

/**
 * packageName    : src.page.user.LoginPage.jsx
 * fileName       : LoginPage.jsx
 * author         : ysg
 * date           : 25.06.11
 * description    : (수정) 소셜 로그인 로직 추가
 * ===========================================================
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginside } from '@/assets/images';
import { useUser } from '@/contexts/UserProvider'; // 사용자 상태 업데이트 함수

import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import SocialButton from '@/components/common/SocialButton';

import axios from 'axios';

const LoginPage = () => {
    const [uId, setUId] = useState('');
    const [uPwd, setUPwd] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { loginUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/user/login", { uId, uPwd });

            const token = response.data.token;
            const userId = response.data.uId;

            if (!token) throw new Error("서버에서 토큰을 받지 못했습니다.");

            // localStorage 저장 (UserProvider 복원용)
            localStorage.setItem("accessToken", token);
            localStorage.setItem("uId", userId);
            localStorage.setItem("role", "USER"); // USER 고정

            // 로그 확인 (테스트용)
            console.log("로그인 성공");
            console.log("저장된 토큰:", token);
            console.log("로그인한 ID:", userId);

            // Context에 유저 상태 저장 (name은 useEffect에서 fetch됨)
            loginUser({
                id: userId,
                name: null, // name은 UserProvider에서 가져옴
                token,
                role: "USER",
                type: "user",
            });

            // 메인페이지로 이동
            navigate("/");
        } catch (error) {
            console.error("로그인 실패:", error);
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    };
    const handleGoogleLogin = () => {
        const redirectUri = "http://localhost:5173/login";
        const clientId = "127012581616-f2iqmfjad5pijoo9u4g2ld04r0b78bv3.apps.googleusercontent.com";
        const scope = "https://www.googleapis.com/auth/userinfo.email";
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
        window.location.href = authUrl;
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (code){

            axios.post("/api/oauth2/google", null, { params: { code } })
                .then((res) => {
                    const token = res.data.accessToken;
                    const userId = res.data.uId;
                    if (!token) throw new Error("토큰 없음");

                    // 구글 로그입 시 이메일 기준 유지 생성 -> uId가 DB에서 자동 생성됨
                    localStorage.setItem("accessToken", token);
                    localStorage.setItem("uId", userId);
                    localStorage.setItem("role", "USER");


                    loginUser({
                        id: userId,
                        name: null,
                        token,
                        role: "USER",
                        type: "user",
                    });

                        navigate("/");
                    })
                    .catch((err) => {
                        if (err.response?.status === 401) {
                            // 백엔드에서 받은 메세지 표시
                            alert(err.response?.data);
                            navigate("/signup");
                        } else {
                            alert("Google 로그인 실패");
                        }
                    });
                }
            }, [location.search]);

    return (
        <div className="flex h-screen">
            {/* 왼쪽 이미지 영역 */}
            <div className="w-1/2 hidden md:block">
                <img
                    src={loginside}
                    alt="로그인 이미지"
                    className="w-full h-full object-cover sticky"
                />
            </div>

            {/* 오른쪽 로그인 폼 영역 */}
            <div className="w-full md:w-1/2 flex-center relative bg-white">
                <form className="w-[90%] max-w-sm z-10" onSubmit={handleLogin}>
                    <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

                    <InputField
                        label="아이디"
                        name="uId"
                        placeholder="아이디를 입력하세요"
                        value={uId}
                        onChange={(e) => setUId(e.target.value)}
                        className="mb-5 h-12"
                    />
                    <InputField
                        label="비밀번호"
                        name="uPwd"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={uPwd}
                        onChange={(e) => setUPwd(e.target.value)}
                        className="mb-5 h-12"
                    />

                    <div className="text-sm w-full flex justify-between mb-4">
                        <a href="/idpwfind" className="text-gray-600 hover:underline">
                            아이디/회원번호 찾기
                        </a>
                        <a href="/signup" className="text-gray-600 hover:underline">
                            회원가입
                        </a>
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                        로그인
                    </Button>

                </form>
                    <div className="flex justify-around mt-5">
                        <SocialButton platform="kakao" onClick={() => console.log('카카오')} />
                        {/* <SocialButton platform="naver" onClick={() => console.log('네이버')} /> */}
                        <SocialButton platform="google" onClick={handleGoogleLogin} />
                    </div>
            </div>
        </div>
    );
};

export default LoginPage;
