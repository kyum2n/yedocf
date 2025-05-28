import BannerSection from "@/components/common/BannerSection";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useState } from "react";
import { banner1 } from '@/assets/images';
import Spacer from "@/components/common/Spacer";

const SignupPage = () => {
    const [form, setForm] = useState({
        name: "",
        userId: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        termsAll: false,
        termsRequired1: false,
        termsRequired2: false,
        termsOptional: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 백엔드로 form 데이터 전송
        console.log(form);
    };

    return (
        <div>
            <BannerSection
                title="회원가입"
                subtitle="연세 성형외과에 오신 걸 환영합니다"
                image={banner1}
                objectPosition="object-[50%_20%]"
            />
            <div className="relative z-20 bg-white">
            <Spacer/>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 py-8 space-y-6">
                    <InputField
                        name="name"
                        placeholder="이름"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <InputField
                        name="userId"
                        placeholder="아이디"
                        value={form.userId}
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    <InputField
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <InputField
                        type="tel"
                        name="phone"
                        placeholder="전화번호"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <div className="space-y-2 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="termsAll"
                                checked={form.termsAll}
                                onChange={handleChange}
                            />
                            전체 약관 동의
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="termsRequired1"
                                checked={form.termsRequired1}
                                onChange={handleChange}
                            />
                            [필수] 이용약관 동의
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="termsRequired2"
                                checked={form.termsRequired2}
                                onChange={handleChange}
                            />
                            [필수] 개인정보 수집 및 이용 동의
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="termsOptional"
                                checked={form.termsOptional}
                                onChange={handleChange}
                            />
                            [선택] 마케팅 수신 동의
                        </label>
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-3 mt-2 text-lg">
                        회원가입
                    </Button>
                    <Spacer size="lg"/>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
