import Sidebar from "@/components/admin/Sidebar";
import InputField from "@/components/common/InputField";
import ItemSelect from "@/components/common/ItemSelect";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import TimeSelectorSelect from "@/components/admin/TimeSelectorSelect";

const ReservationManagePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const [userId, setUserId] = useState("");
    const [procedure, setProcedure] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [status, setStatus] = useState("");

    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const searchOptions = [
        { value: "id", label: "예약 ID" },
        { value: "userId", label: "예약자 아이디" },
        { value: "procedure", label: "시술 항목" },
        { value: "date", label: "예약 날짜" },
        { value: "time", label: "시간대" },
        { value: "status", label: "예약 상태" },
    ];

    const statusOptions = [
        { value: "done", label: "예약 완료" },
        { value: "cancel", label: "예약 취소" },
        { value: "pending", label: "대기중" },
    ];

    const selectedLabel = searchOptions.find(opt => opt.value === searchCategory)?.label;

    const resetForm = () => {
        setUserId("");
        setProcedure("");
        setSelectedDate("");
        setSelectedTime("");
        setStatus("");
    };

    const handleCloseModal = () => {
        resetForm();
        setIsModalOpen(false);
    };

    return (
        <div className="flex">
            <Sidebar isLoggedIn={true} isSuperAdmin={true} adminName="최고관리자" />

            <main className="w-full min-h-screen p-8 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6">예약 관리</h1>

                {/* 상단 검색 영역 */}
                <div className="flex mb-4 justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <ItemSelect
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            options={searchOptions}
                            className="h-10"
                        />
                        <div className="w-1/2">
                            <InputField
                                name="searchText"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder={
                                    searchCategory
                                        ? `${selectedLabel}을(를) 입력하세요`
                                        : "검색할 항목을 먼저 선택하세요"
                                }
                                variant="admin"
                                className="h-10"
                                labelHidden={true}
                            />
                        </div>
                        <Button variant="primary" className="h-10">검색</Button>
                    </div>

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
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                setSelectedReservation(); // reservation은 실제 데이터
                                                setIsEditModalOpen(true);
                                            }}
                                        >변경</Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setSelectedReservation();
                                                setIsDeleteModalOpen(true);
                                            }}
                                        >삭제</Button>
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
                    resetOnClose={true}
                    onAction={() => {
                        console.log({
                            userId,
                            procedure,
                            date: selectedDate,
                            time: selectedTime,
                            status,
                        });
                        setIsModalOpen(false);
                        handleCloseModal();
                        // 💡 여기에 예약 추가 API 연동 가능
                    }}
                >
                    <InputField
                        name="userId"
                        placeholder="예약자 아이디"
                        variant="admin"
                        className="p-2"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <InputField
                        name="procedure"
                        placeholder="시술 항목"
                        variant="admin"
                        className="p-2"
                        value={procedure}
                        onChange={(e) => setProcedure(e.target.value)}
                    />
                    <InputField
                        name="date"
                        type="date"
                        variant="admin"
                        className="p-2"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime(""); // 날짜 바뀌면 시간 초기화
                        }}
                    />
                    <TimeSelectorSelect
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onSelect={setSelectedTime}
                        className="p-2"
                        labelHidden={true}
                    />
                    <ItemSelect
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={statusOptions}
                        className="p-2"
                    />
                </Modal>

                {/* 예약 삭제 모달 */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    title="예약 삭제"
                    actionLabel="삭제"
                    onAction={() => {
                        console.log("삭제 요청:", selectedReservation.id);
                        setIsDeleteModalOpen(false);
                        // 💡 API로 삭제 요청 후 리스트 갱신
                    }}
                >
                    <p className="text-sm text-gray-700">
                        예약자 <strong>{selectedReservation?.userId}</strong>의 예약을 삭제하시겠습니까?
                    </p>
                </Modal>
                {/* 예약 수정 모달 */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="예약 변경"
                    actionLabel="변경"
                    onAction={() => {
                        console.log("변경된 예약:", selectedReservation);
                        setIsEditModalOpen(false);
                        // 💡 여기서 수정 API 호출: PUT /api/reservation/:id
                    }}
                    resetOnClose={true}
                >
                    <InputField
                        name="userId"
                        placeholder="예약자 아이디"
                        variant="admin"
                        className="p-2"
                        value={selectedReservation?.userId || ""}
                        onChange={(e) =>
                            setSelectedReservation((prev) => ({ ...prev, userId: e.target.value }))
                        }
                    />
                    <InputField
                        name="procedure"
                        placeholder="시술 항목"
                        variant="admin"
                        className="p-2"
                        value={selectedReservation?.procedure || ""}
                        onChange={(e) =>
                            setSelectedReservation((prev) => ({ ...prev, procedure: e.target.value }))
                        }
                    />
                    <InputField
                        name="date"
                        type="date"
                        variant="admin"
                        className="p-2"
                        value={selectedReservation?.date || ""}
                        onChange={(e) =>
                            setSelectedReservation((prev) => ({
                                ...prev,
                                date: e.target.value,
                                time: "", // 날짜 바뀌면 시간 초기화
                            }))
                        }
                    />
                    <TimeSelectorSelect
                        selectedDate={selectedReservation?.date || ""}
                        selectedTime={selectedReservation?.time || ""}
                        onSelect={(newTime) =>
                            setSelectedReservation((prev) => ({ ...prev, time: newTime }))
                        }
                        className="p-2"
                        labelHidden={true}
                    />
                    <ItemSelect
                        value={selectedReservation?.status || ""}
                        onChange={(e) =>
                            setSelectedReservation((prev) => ({ ...prev, status: e.target.value }))
                        }
                        options={statusOptions}
                        className="p-2"
                    />
                </Modal>
            </main>
        </div>
    );
};

export default ReservationManagePage;
