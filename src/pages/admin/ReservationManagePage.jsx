import Sidebar from "@/components/admin/Sidebar";
import InputField from "@/components/common/InputField";
import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import TimeSelectorSelect from "@/components/admin/TimeSelectorSelect";
import { useState, useEffect } from "react";
import axios from "axios";

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

  const [reservations, setReservations] = useState([]);

  const searchOptions = [
    { value: "id", label: "예약 ID" },
    { value: "userId", label: "예약자 아이디" },
    { value: "procedure", label: "시술 항목" },
    { value: "date", label: "예약 날짜" },
    { value: "time", label: "시간대" },
    { value: "status", label: "예약 상태" },
  ];

  const statusOptions = [
    { value: "대기", label: "대기" },
    { value: "확정", label: "확정" },
    { value: "취소", label: "취소" },
  ];

  const selectedLabel = searchOptions.find(
    (opt) => opt.value === searchCategory
  )?.label;

  useEffect(() => {
    axios.get("/api/admin/reserves").then((res) => {
      setReservations(res.data);
    });
  }, []);

  const handleStatusChange = (rId, status) => {
    axios
      .post(`/api/admin/reserve/${rId}/status`, null, {
        params: { status },
      })
      .then(() => {
        setReservations(
          reservations.map((r) => (r.rId === rId ? { ...r, status } : r))
        );
      });
  };

  const handleDeleteReservation = () => {
    axios.post(`/api/admin/reserve/${selectedReservation.rId}`).then(() => {
      setReservations(
        reservations.filter((r) => r.rId !== selectedReservation.rId)
      );
      setIsDeleteModalOpen(false);
    });
  };


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
            <Dropdown
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
            <Button variant="primary" className="h-10">
              검색
            </Button>
          </div>

          <Button
            variant="primary"
            className="h-10 bg-green-600"
            onClick={() => setIsModalOpen(true)}
          >
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
              {reservations.map((r) => (
                <tr className="text-center" key={r.rId}>
                  <td className="px-4 py-2 border">{r.rId}</td>
                  <td className="px-4 py-2 border">{r.uId}</td>
                  <td className="px-4 py-2 border">{r.tName}</td>
                  <td className="px-4 py-2 border">{r.consultDate}</td>
                  <td className="px-4 py-2 border">{r.consultTime}</td>
                  <td className="px-4 py-2 border">
                    <select
                      className="border p-1"
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(r.rId, e.target.value)
                      }
                    >
                      <option value="대기">대기</option>
                      <option value="확정">확정</option>
                      <option value="취소">취소</option>
                    </select>
                  </td>
                  <td className="py-2 border text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectedReservation(r);
                          setIsEditModalOpen(true);
                        }}
                      >
                        변경
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setSelectedReservation(r);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* 예약 추가 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
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
              setSelectedTime("");
            }}
          />
          <TimeSelectorSelect
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
            className="p-2"
            labelHidden={true}
          />
          <Dropdown
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
          onAction={handleDeleteReservation}
        >
          <p className="text-sm text-gray-700">
            예약자 <strong>{selectedReservation?.userId}</strong>의 예약을
            삭제하시겠습니까?
          </p>
        </Modal>

        {/* 예약 수정 모달 */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="예약 변경"
          actionLabel="변경"
          resetOnClose={true}
          onAction={() => {
            console.log("변경된 예약:", selectedReservation);
            setIsEditModalOpen(false);
          }}
        >
          <InputField
            name="userId"
            placeholder="예약자 아이디"
            variant="admin"
            className="p-2"
            value={selectedReservation?.userId || ""}
            onChange={(e) =>
              setSelectedReservation((prev) => ({
                ...prev,
                userId: e.target.value,
              }))
            }
          />
          <InputField
            name="procedure"
            placeholder="시술 항목"
            variant="admin"
            className="p-2"
            value={selectedReservation?.procedure || ""}
            onChange={(e) =>
              setSelectedReservation((prev) => ({
                ...prev,
                procedure: e.target.value,
              }))
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
                time: "",
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
          <Dropdown
            value={selectedReservation?.status || ""}
            onChange={(e) =>
              setSelectedReservation((prev) => ({
                ...prev,
                status: e.target.value,
              }))
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
