import BannerSection from "@/components/common/BannerSection";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Spacer from "@/components/common/Spacer";
import { banner1 } from '@/assets/cdnImages';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const SignupPage = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        userId: "",
        password: "",
        confirmPassword: "",
        email: "",
        emailCertificate: "",
        phone: "",
        termsAll: false,
        termsRequired1: false,
        termsRequired2: false,
        termsRequired3: false,
    });

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, "");
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
                termsRequired3: checked,
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

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState("");
    const [emailCertError, setEmailCertError] = useState("");

    const handleCertChange = (e) => {
        setForm((prev) => ({ ...prev, emailCertificate: e.target.value }));
        setEmailCertError(""); // 입력 시 에러 초기화
    };

    const [remainingTime, setRemainingTime] = useState(180); // 3분

    useEffect(() => {
        if (isEmailSent && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isEmailSent, remainingTime]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const validateForm = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
        const emailRegex = /\S+@\S+\.\S+/;

        if (!form.name.trim())
            errors.name = "이름을 입력해주세요.";
        if (!form.userId.trim() || form.userId.length < 4 || form.userId.length > 20)
            errors.userId = "아이디는 4~20자 사이여야 합니다.";
        if (!passwordRegex.test(form.password))
            errors.password = "비밀번호는 영문+숫자+특수문자 조합 8자 이상이어야 합니다.";
        if (form.password !== form.confirmPassword)
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!emailRegex.test(form.email))
            errors.email = "이메일 형식이 올바르지 않습니다.";
        if (isEmailSent) {
            if (!form.emailCertificate.trim()) {
                errors.emailCertificate = "인증번호를 입력해주세요.";
            } else if (form.emailCertificate !== emailVerificationCode) {
                errors.emailCertificate = "인증번호가 올바르지 않습니다.";
            }
        } else {
            errors.email = "이메일 인증을 완료해주세요.";
        }
        if (!phoneRegex.test(form.phone))
            errors.phone = "전화번호 형식이 올바르지 않습니다.";
        if (!form.termsRequired1 || !form.termsRequired2)
            errors.terms = "필수 약관에 모두 동의해주세요.";
        return errors;
    };

    const handleEmailVerification = () => {
        if (!form.email || formErrors.email) {
            setFormErrors((prev) => ({
                ...prev,
                email: "이메일을 올바르게 입력한 후 인증을 요청해주세요.",
            }));
            return;
        }

        // ✅ 인증번호 재설정 및 인증 관련 상태 초기화
        const mockCode = "123456";
        setEmailVerificationCode(mockCode);
        setForm((prev) => ({
            ...prev,
            emailCertificate: "" // 입력값 초기화
        }));
        setFormErrors((prev) => {
            const { emailCertificate, ...rest } = prev;
            return rest;
        });
        setRemainingTime(180); // 타이머 초기화
        setIsEmailSent(true); // 표시 플래그
        alert("입력하신 이메일로 인증번호를 전송했습니다.");
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
                        <div className="flex w-full items-center gap-1">
                            <div className="relative w-full">
                                <InputField type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} className="h-12" />
                            </div>
                            <Button type="button" variant="primary" onClick={handleEmailVerification}>이메일 인증</Button>
                        </div>
                        {formErrors.email && <p className="text-red-500 text-sm absolute">{formErrors.email}</p>}
                    </div>
                    {isEmailSent && (
                        <div>
                            <div className="flex w-full items-center gap-1">
                                <div className="relative w-full">
                                    <InputField name="emailCertificate" placeholder="이메일 인증번호" value={form.emailCertificate} onChange={handleCertChange} className="h-12" />
                                </div>
                                <Button type="button" variant="primary"
                                    onClick={() => {
                                        const newErrors = { ...formErrors };

                                        if (!form.emailCertificate.trim()) {
                                            newErrors.emailCertificate = "인증번호를 입력해주세요.";
                                        } else if (form.emailCertificate !== emailVerificationCode) {
                                            newErrors.emailCertificate = "인증번호가 올바르지 않습니다.";
                                        } else {
                                            delete newErrors.emailCertificate;
                                            alert("인증이 완료되었습니다.");
                                        }

                                        setFormErrors(newErrors);
                                    }}
                                >
                                    인증번호 확인
                                </Button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                {formErrors.emailCertificate && <p className="text-red-500 text-sm mt-1">{formErrors.emailCertificate}</p>}
                                <p>남은 시간 : {formatTime(remainingTime)}</p>
                            </div>
                        </div>
                    )}
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
                            <input type="checkbox" name="termsRequired3" checked={form.termsRequired3} onChange={handleChange} />
                            [필수] 이메일 수신을 통한 알림 동의
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
