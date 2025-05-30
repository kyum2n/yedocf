import Sidebar from "@/components/admin/Sidebar";
import InputField from "@/components/common/InputField";
import ItemSelect from "@/components/common/ItemSelect";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useState } from "react";

const StaffManagePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const searchOptions = [
        { value: "name", label: "이름" },
        { value: "username", label: "아이디" },
        { value: "password", label: "비밀번호" },
        { value: "email", label: "이메일" },
    ];

    const selectedLabel = searchOptions.find(opt => opt.value === searchCategory)?.label;

    return (
        <div className="flex">
            <Sidebar isLoggedIn={true} isSuperAdmin={true} adminName="최고관리자" />

            <main className="w-full min-h-screen p-8 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6">직원 관리</h1>

                {/* 검색 & 추가 버튼 */}
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
                            <tr className="text-center">
                                <td className="px-4 py-2 border">이름</td>
                                <td className="px-4 py-2 border">아이디</td>
                                <td className="px-4 py-2 border text-center group">
                                    <span className="group-hover:hidden text-gray-500">••••••</span>
                                    <span className="hidden group-hover:inline text-black">01user</span>
                                </td>
                                <td className="px-4 py-2 border">hong@example.com</td>
                                <td className="py-2 border text-center">
                                    <Button variant="danger">삭제</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 직원 추가 모달 */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="직원 추가"
                    actionLabel="추가"
                    onAction={() => {
                        console.log("직원 추가");
                        setIsModalOpen(false);
                    }}
                >
                    <InputField name="name" placeholder="이름" variant="admin" className="p-2" />
                    <InputField name="username" placeholder="아이디" variant="admin" className="p-2" />
                    <InputField name="password" placeholder="비밀번호" variant="admin" type="password" className="p-2" />
                    <InputField name="email" placeholder="이메일" variant="admin" className="p-2" />
                </Modal>
            </main>
        </div>
    );
};

export default StaffManagePage;
