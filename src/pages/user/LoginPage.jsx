import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserProvider';

import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import SocialButton from '@/components/common/SocialButton';
import { login_side } from '@/assets/cdnImages';

import axios from 'axios';

const LoginPage = () => {
    // 사용자 입력값 상태
    const [uId, setUId] = useState('');
    const [uPwd, setUPwd] = useState('');

    // 소셜 로그인 시 일반 로그인 오류 알림 방지용 상태
    const [isSocialLogin, setIsSocialLogin] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser } = useUser();

    // 로그인 성공 시 처리 함수 (공통 로직)
    const handleLoginSuccess = (userId, token, provider) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("uId", userId);
        localStorage.setItem("role", "USER");
        localStorage.setItem("loginProvider", provider);

        loginUser({
            id: userId,
            name: null,
            token,
            role: "USER",
            type: "user",
        });

        navigate("/");
    };

    // 일반 로그인 처리
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/user/login", { uId, uPwd });
            const token = response.data.token;
            const userId = response.data.uId;

            if (!token) throw new Error("서버에서 토큰을 받지 못했습니다.");

            handleLoginSuccess(userId, token, "default");
        } catch (error) {
            console.error("로그인 실패:", error);

            // 소셜 로그인 중이 아닌 경우에만 알림
            if (!isSocialLogin) {
                alert("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        }
    };

    // 구글 소셜 로그인 URL 생성 및 이동
    const handleGoogleLogin = () => {
        const redirectUri = "http://localhost:5173/login";
        const clientId = "127012581616-f2iqmfjad5pijoo9u4g2ld04r0b78bv3.apps.googleusercontent.com";
        const scope = "https://www.googleapis.com/auth/userinfo.email";
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = authUrl;
    };

    // 구글 로그인 후 리다이렉트 시 code 파라미터 처리
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (!code) return;

        setIsSocialLogin(true); // 소셜 로그인 상태 설정

        axios.post("/api/oauth2/google", null, { params: { code } })
            .then((res) => {
                const token = res.data?.accessToken;
                const userId = res.data?.uId;

                if (!token || !userId) {
                    throw new Error("응답에서 토큰 또는 사용자 ID 없음");
                }

                handleLoginSuccess(userId, token, "google");
            })
            .catch((err) => {
                console.error("구글 로그인 실패:", err);

                if (err.response?.status === 401) {
                    alert(err.response?.data || "해당 이메일로 가입된 사용자가 없습니다. 회원가입이 필요합니다.");
                    navigate("/signup");
                } else {
                    alert("Google 로그인 실패");
                }
            });
    }, [location.search]);

    return (
        <div className="flex h-screen">
            {/* 왼쪽 이미지 영역 (PC만 표시) */}
            <div className="w-1/2 hidden md:block">
                <img
                    src={login_side}
                    alt="로그인 이미지"
                    className="w-full h-full object-cover sticky"
                />
            </div>

            {/* 오른쪽 로그인 입력 폼 영역 */}
            <div className="w-full md:w-1/2 flex-center relative bg-white flex-col">
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

                    {/* 하단 링크 */}
                    <div className="text-sm w-full flex justify-between mb-4">
                        <a href="/idpwfind" className="text-gray-600 hover:underline">
                            아이디/회원번호 찾기
                        </a>
                        <a href="/signup" className="text-gray-600 hover:underline">
                            회원가입
                        </a>
                    </div>

                    {/* 로그인 버튼 */}
                    <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                        로그인
                    </Button>
                </form>

                {/* 소셜 로그인 버튼 영역 */}
                <div className="flex justify-around mt-5 flex-col gap-2 w-[90%] max-w-sm">
                    <SocialButton platform="kakao" onClick={() => console.log('카카오')} />
                    <SocialButton platform="google" onClick={handleGoogleLogin} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;