import BannerSection from "@/components/common/BannerSection";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Spacer from "@/components/common/Spacer";
import { banner1 } from '@/assets/images';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
    const navigate = useNavigate();
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
    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, ""); // 숫자만 남김
        if (numbers.length < 4) return numbers;
        if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    };
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "termsAll") {
            setForm((prev) => ({
                ...prev,
                termsAll: checked,
                termsRequired1: checked,
                termsRequired2: checked,
                termsOptional: checked,
            }));
        } else {
            const formattedValue =
                name === "phone" ? formatPhoneNumber(value) : value;

            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : formattedValue,
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
        const emailRegex = /\S+@\S+\.\S+/;

        if (!form.name.trim()) errors.name = "이름을 입력해주세요.";
        if (!form.userId.trim() || form.userId.length < 4 || form.userId.length > 20)
            errors.userId = "아이디는 4~20자 사이여야 합니다.";
        if (!passwordRegex.test(form.password))
            errors.password = "비밀번호는 영문+숫자+특수문자 조합 8자 이상이어야 합니다.";
        if (form.password !== form.confirmPassword)
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!emailRegex.test(form.email)) errors.email = "이메일 형식이 올바르지 않습니다.";
        if (!phoneRegex.test(form.phone)) errors.phone = "전화번호 형식이 올바르지 않습니다.";
        if (!form.termsRequired1 || !form.termsRequired2)
            errors.terms = "필수 약관에 모두 동의해주세요.";

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            await axios.post("http://localhost:8080/api/user/register", {
                uId: form.userId,
                uPwd: form.password,
                uEmail: form.email,
                uName: form.name,
                uPhone: form.phone,
            });

            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        } catch (error) {
            const msg = error.response?.data;
            if (typeof msg === 'string') {
                alert("회원가입 실패: " + msg);
            } else if (typeof msg === 'object') {
                const messages = Object.values(msg).join('\n');
                alert("회원가입 실패:\n" + messages);
            } else {
                alert("회원가입 실패: 서버 오류");
            }
        }
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
                <Spacer />
                <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 space-y-10">
                    <div>
                        <InputField name="name" placeholder="이름" value={form.name} onChange={handleChange} className="h-12" />
                        {formErrors.name && <p className="text-red-500 text-sm absolute">{formErrors.name}</p>}
                    </div>
                    <div>
                        <InputField name="userId" placeholder="아이디" value={form.userId} onChange={handleChange} className="h-12" />
                        {formErrors.userId && <p className="text-red-500 text-sm absolute">{formErrors.userId}</p>}
                    </div>
                    <div>
                        <InputField type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} className="h-12" />
                        {formErrors.password && <p className="text-red-500 text-sm absolute">{formErrors.password}</p>}
                    </div>
                    <div>
                        <InputField type="password" name="confirmPassword" placeholder="비밀번호 확인" value={form.confirmPassword} onChange={handleChange} className="h-12" />
                        {formErrors.confirmPassword && <p className="text-red-500 text-sm absolute">{formErrors.confirmPassword}</p>}
                    </div>
                    <div>
                        <InputField type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} className="h-12" />
                        {formErrors.email && <p className="text-red-500 text-sm absolute">{formErrors.email}</p>}
                    </div>
                    <div>
                        <InputField type="tel" name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} className="h-12" />
                        {formErrors.phone && <p className="text-red-500 text-sm absolute">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-2 text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="termsAll" checked={form.termsAll} onChange={handleChange} />
                            전체 약관 동의
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="termsRequired1" checked={form.termsRequired1} onChange={handleChange} />
                            [필수] 이용약관 동의
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="termsRequired2" checked={form.termsRequired2} onChange={handleChange} />
                            [필수] 개인정보 수집 및 이용 동의
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="termsOptional" checked={form.termsOptional} onChange={handleChange} />
                            [필수] 마케팅 수신 동의
                        </label>
                        {formErrors.terms && <p className="text-red-500 text-sm absolute">{formErrors.terms}</p>}
                    </div>
                    <Spacer size="xs" />
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                        회원가입
                    </Button>
                    <Spacer size="lg" />
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
