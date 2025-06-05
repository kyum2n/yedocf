import Sidebar from "@/components/admin/Sidebar";
import InputField from "@/components/common/InputField";
import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useState } from "react";

const StaffManagePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleCloseDeleteModal = () => {
        setSelectedUser(null);
        setIsDeleteModalOpen(false);
    };

    const searchOptions = [
        { value: "name", label: "이름" },
        { value: "username", label: "아이디" },
        { value: "password", label: "비밀번호" },
        { value: "email", label: "이메일" },
    ];

    const selectedLabel = searchOptions.find(opt => opt.value === searchCategory)?.label;

    // 예시용 더미 데이터 (API 연동 전)
    const dummyStaffList = [
        {
            id: 1,
            name: "홍길동",
            username: "staff01",
            password: "01user", // 실제로는 백엔드에서 해싱된 값만 받아야 함
            email: "hong@example.com"
        }
    ];

    return (
        <div className="flex">
            <Sidebar isLoggedIn={true} isSuperAdmin={true} adminName="최고관리자" />

            <main className="w-full min-h-screen p-8 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6">직원 관리</h1>

                {/* 검색 & 추가 버튼 */}
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
                        <Button variant="primary" className="h-10">검색</Button>
                    </div>

                    <Button
                        variant="primary"
                        className="h-10 bg-green-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        직원 추가
                    </Button>
                </div>

                {/* 직원 테이블 */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-center text-sm font-semibold">
                                <th className="px-4 py-3 border">이름</th>
                                <th className="px-4 py-3 border">아이디</th>
                                <th className="px-4 py-3 border">비밀번호</th>
                                <th className="px-4 py-3 border">이메일</th>
                                <th className="py-3 border">삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyStaffList.map((user) => (
                                <tr key={user.id} className="text-center">
                                    <td className="px-4 py-2 border">{user.name}</td>
                                    <td className="px-4 py-2 border">{user.username}</td>
                                    <td className="px-4 py-2 border text-center group">
                                        <span className="group-hover:hidden text-gray-500">••••••</span>
                                        <span className="hidden group-hover:inline text-black">{user.password}</span>
                                    </td>
                                    <td className="px-4 py-2 border">{user.email}</td>
                                    <td className="py-2 border text-center">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsDeleteModalOpen(true);
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 직원 추가 모달 */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="직원 추가"
                    actionLabel="추가"
                    resetOnClose={true}
                    onAction={() => {
                        console.log("직원 추가 요청");
                        setIsModalOpen(false);
                    }}
                >
                    <InputField name="name" placeholder="이름" variant="admin" className="p-2" />
                    <InputField name="username" placeholder="아이디" variant="admin" className="p-2" />
                    <InputField name="password" placeholder="비밀번호" variant="admin" type="password" className="p-2" />
                    <InputField name="email" placeholder="이메일" variant="admin" className="p-2" />
                </Modal>

                {/* 직원 삭제 모달 */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    title="직원 삭제"
                    actionLabel="삭제"
                    onAction={() => {
                        console.log("삭제 요청:", selectedUser?.id);
                        // 💡 API 요청: DELETE /api/staff/:id
                        handleCloseDeleteModal();
                    }}
                >
                    <p className="text-sm text-gray-700">
                        직원 <strong>{selectedUser?.name}</strong>
                        ({selectedUser?.username})을(를) 정말 삭제하시겠습니까?
                    </p>
                </Modal>
            </main>
        </div>
    );
};

export default StaffManagePage;
