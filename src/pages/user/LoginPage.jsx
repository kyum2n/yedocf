import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginside } from '@/assets/images';

import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import SocialButton from '@/components/common/SocialButton';

import axios from 'axios';

const LoginPage = () => {
    const [uId, setUId] = useState('');
    const [uPwd, setUPwd] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/user/login', { uId, uPwd });

            // 로그인 성공: 토큰만 저장
            localStorage.setItem('token', 'dummy-token'); // 실제로는 response에서 받아야 함

            // 필요하다면 uId도 저장 (이름 조회 등에 사용)
            localStorage.setItem('uId', uId);

            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

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

                    <div className="flex justify-around mt-5">
                        <SocialButton platform="kakao" onClick={() => console.log('카카오')} />
                        <SocialButton platform="naver" onClick={() => console.log('네이버')} />
                        <SocialButton platform="google" onClick={() => console.log('구글')} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
