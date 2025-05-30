import { loginside } from '@/assets/images';

import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import SocialButton from '@/components/common/SocialButton';

const LoginPage = () => {
    return (
        <div className="flex h-screen">
            {/* 왼쪽 이미지영역 */}
            <div className="w-1/2 hidden md:block ">
                <img src={loginside} alt="로그인 이미지"
                    className="w-full h-full object-cover sticky" />
            </div>
            {/* 오른쪽 로그인 폼 영역 */}
            <div className="w-full md:w-1/2 flex-center relative bg-white">
                <form className="w-[90%] max-w-sm z-10">
                    <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
                    <InputField
                        label="아이디"
                        name="uId"
                        placeholder="아이디를 입력하세요"
                        className="mb-5  h-12"
                    />
                    <InputField
                        label="비밀번호"
                        name="uPwd"
                        type='password'
                        placeholder="비밀번호를 입력하세요"
                        className="mb-5  h-12"
                    />
                    <div className="text-sm w-full flex justify-between mb-4">
                        <a href="/idpwfind" className=' text-gray-600 mt-0 hover:underline' >아이디/회원번호 찾기</a>
                        <a href="/signup" className=' text-gray-600 mt-0 hover:underline' >회원가입</a>
                    </div>
                    <Button variant="primary" size='lg' className='w-full mt-2'>
                        로그인
                    </Button>
                    <div className="flex justify-around mt-5">
                        <SocialButton platform="kakao" onClick={() => console.log("카카오")} />
                        <SocialButton platform="naver" onClick={() => console.log("네이버")} />
                        <SocialButton platform="google" onClick={() => console.log("구글")} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
