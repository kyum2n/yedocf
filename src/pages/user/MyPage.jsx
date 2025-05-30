import { useState } from "react";
import BannerSection from "@/components/common/BannerSection";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import Spacer from "@/components/common/Spacer";
import { banner2 } from '@/assets/images';
import GoToReservationButton from "@/components/common/GoToReservationButton";

const MyPage = () => {
    const [showPwdModal, setShowPwdModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    // 가짜 예약 내역
    const reservations = [
        { id: 1, title: "시술 1", date: "2025.01.01", time: "14:00", status: "상담 완료" },
        { id: 2, title: "시술 2", date: "2025.02.02", time: "14:00", status: "확정" },
        { id: 3, title: "시술 3", date: "2025.03.03", time: "14:00", status: "취소 완료" },
        { id: 4, title: "시술 4", date: "2025.04.04", time: "14:00", status: "예약됨" },
    ];

    return (
        <>
            <BannerSection
                title="마이페이지"
                subtitle="회원 정보와 예약 내역을 확인하세요"
                image={banner2}
                objectPosition="object-[50%_20%]"
            />
            <div className="relative z-20 bg-white">
                <Spacer />
                <section className="max-w-4xl mx-auto p-8 space-y-10">
                    {/* 회원 정보 */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">회원 정보</h2>
                        <table className="w-full max-w-2xl text-sm">
                            <tbody>
                                <tr>
                                    <th className="text-left font-medium py-3 w-1/4">이름</th>
                                    <td className="py-3">최미래</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th className="text-left font-medium py-3">아이디</th>
                                    <td className="py-3">future123</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th className="text-left font-medium py-3">비밀번호</th>
                                    <td className="py-3">●●●●●●</td>
                                    <td className="text-right">
                                        <Button variant="secondary" onClick={() => setShowPwdModal(true)}>변경</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-left font-medium py-3">이메일</th>
                                    <td className="py-3">future321@test.com</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th className="text-left font-medium py-3">전화번호</th>
                                    <td className="py-3">010-0000-0000</td>
                                    <td className="text-right">
                                        <Button variant="secondary" onClick={() => setShowPhoneModal(true)}>변경</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Spacer />

                    {/* 예약 내역 */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">예약 내역</h2>
                        <table className="w-full border border-gray-300 text-center text-sm">
                            <thead className="bg-pink-100 text-gray-800">
                                <tr>
                                    <th className="p-2 border">예약 항목</th>
                                    <th className="p-2 border">예약 날짜</th>
                                    <th className="p-2 border">시간</th>
                                    <th className="p-2 border">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((r) => (
                                    <tr key={r.id}>
                                        <td className="border p-2">{r.title}</td>
                                        <td className="border p-2">{r.date}</td>
                                        <td className="border p-2">{r.time}</td>
                                        <td className="border p-2">
                                            {r.status === "예약됨" ? (
                                                <Button
                                                    variant="secondary"
                                                    className="text-sm"
                                                    onClick={() => console.log("예약 취소", r.id)}
                                                >
                                                    취소하기
                                                </Button>
                                            ) : (
                                                r.status
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <Spacer size="lg" />
                <GoToReservationButton />
            </div>
            {/* 비밀번호 변경 모달 */}
            <Modal
                isOpen={showPwdModal}
                onClose={() => setShowPwdModal(false)}
                title="비밀번호 변경"
                actionLabel="변경"
                onAction={() => {
                    console.log("비밀번호 변경 요청");
                    setShowPwdModal(false);
                }}
            >
                <input type="password" placeholder="기존 비밀번호" className="w-full border p-2 rounded mb-3" />
                <input type="password" placeholder="새 비밀번호" className="w-full border p-2 rounded mb-3" />
                <input type="password" placeholder="비밀번호 확인" className="w-full border p-2 rounded" />
            </Modal>

            {/* 전화번호 변경 모달 */}
            <Modal
                isOpen={showPhoneModal}
                onClose={() => setShowPhoneModal(false)}
                title="전화번호 변경"
                actionLabel="변경"
                onAction={() => {
                    console.log("전화번호 변경 요청");
                    setShowPhoneModal(false);
                }}
            >
                <input type="tel" placeholder="새 전화번호" className="w-full border p-2 rounded" />
            </Modal>
        </>
    );
};

export default MyPage;
