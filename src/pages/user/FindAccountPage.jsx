import BannerSection from "@/components/common/BannerSection";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { banner3 } from '@/assets/images';
import Spacer from "@/components/common/Spacer";

const FindAccountPage = () => {
    return (
        <div>
            <BannerSection
                title="아이디 / 비밀번호 찾기"
                subtitle=""
                image={banner3}
                objectPosition="object-[50%_20%]"
            />
            <div className="relative z-20 bg-white">
                <Spacer />
                <div className="max-w-md mx-auto px-4 py-16 space-y-12">
                    {/* 아이디 찾기 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">아이디 찾기</h2>
                        <InputField
                            name="email"
                            placeholder="이메일을 입력해주세요"
                            className="mb-3"
                        />
                        <Button variant="primary" className="w-full">
                            아이디 찾기
                        </Button>
                    </section>

                    {/* 비밀번호 찾기 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">비밀번호 찾기</h2>
                        <InputField
                            name="userId"
                            placeholder="아이디를 입력해주세요"
                            className="mb-3"
                        />
                        <Button variant="primary" className="w-full">
                            비밀번호 찾기
                        </Button>
                    </section>
                </div>
                <Spacer size="lg" />
            </div>
        </div>
    );
};

export default FindAccountPage;
