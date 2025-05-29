import Sidebar from "@/components/admin/Sidebar";
import InputField from "@/components/common/InputField";
import ItemSelect from "@/components/common/ItemSelect";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useState } from "react";

const ReservationManagePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const searchOptions = {
        id: "예약 ID",
        userId: "예약자 아이디",
        procedure: "시술 항목",
        date: "예약 날짜",
        time: "시간대",
        status: "예약 상태",
    };

    return (
        <div className="flex">
            <Sidebar isLoggedIn={true} isSuperAdmin={true} adminName="최고관리자" />

            <main className="w-full min-h-screen p-8 bg-gray-50">
                {/* 제목 */}
                <h1 className="text-2xl font-bold mb-6">예약 관리</h1>

                {/* 상단 버튼묶음 */}
                <div className="flex mb-4 justify-between items-center gap-4">
                    {/* 검색 영역 */}
                    <div className="flex items-end gap-2">
                        <div className="w-1/4">
                            <ItemSelect
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                options={searchOptions}
                                className="h-10"
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                name="searchText"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder={
                                    searchCategory
                                        ? `${searchOptions[searchCategory]}을(를) 입력하세요`
                                        : "검색할 항목을 먼저 선택하세요"
                                }
                                variant="admin"
                                className="h-10"
                                labelHidden={true}
                            />
                        </div>
                        <Button variant="primary" className="h-10">검색</Button>
                    </div>

                    {/* 예약 추가 버튼 */}
                    <Button variant="primary" className="h-10 bg-green-600" onClick={() => setIsModalOpen(true)}>
                        예약 추가
                    </Button>
                </div>

                {/* 예약 테이블 */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-center text-sm font-semibold">
                                <th className="px-4 py-3 border">예약 ID</th>
                                <th className="px-4 py-3 border">예약자 아이디</th>
                                <th className="px-4 py-3 border">시술 항목</th>
                                <th className="px-4 py-3 border">예약 날짜</th>
                                <th className="px-4 py-3 border">시간대</th>
                                <th className="px-4 py-3 border">예약 상태</th>
                                <th className="py-3 border">변경 / 삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 여기에 예약 리스트 map 예정 */}
                            <tr className="text-center">
                                <td className="px-4 py-2 border">1</td>
                                <td className="px-4 py-2 border">user01</td>
                                <td className="px-4 py-2 border">눈매 교정</td>
                                <td className="px-4 py-2 border">2025-06-03</td>
                                <td className="px-4 py-2 border">14:30</td>
                                <td className="px-4 py-2 border">예약 완료</td>
                                <td className="py-2 border text-center">
                                    <div className="flex gap-2 justify-center">
                                        <Button variant="secondary">변경</Button>
                                        <Button variant="danger">삭제</Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 예약 추가 모달 */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="예약 추가"
                    actionLabel="추가"
                    onAction={() => {
                        console.log("예약 추가");
                        setIsModalOpen(false);
                    }}
                >
                    <InputField name="userId" placeholder="예약자 아이디" variant="admin" />
                    <InputField name="procedure" placeholder="시술 항목" variant="admin" />
                    <InputField name="date" type="date" variant="admin" />
                    <InputField name="time" placeholder="시간대 (예: 14:30)" variant="admin" />
                    <ItemSelect
                        value={""}
                        onChange={() => { }}
                        options={{ done: "예약 완료", cancel: "예약 취소", pending: "대기중" }}
                    />
                </Modal>
            </main>
        </div>
    );
};

export default ReservationManagePage;
