// src/pages/admin/AdminLoginPage.jsx

import { useState } from "react";
import SidebarMinimal from "@/components/admin/SidebarMinimal";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const AdminLoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 (예: API 호출)
    console.log("로그인 시도:", form);
  };

  return (
    <div className="flex">
      <SidebarMinimal />
      <main className="w-full h-screen flex-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-center mb-8">관리자 로그인</h2>

          <InputField
            label="관리자 아이디"
            labelHidden={true}
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="관리자 아이디를 입력하세요"
            variant="admin"
            className="h-12 mb-2"
          />

          <InputField
            label="관리자 비밀번호"
            labelHidden={true}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="관리자 비밀번호를 입력하세요"
            variant="admin"
            className="h-12"
          />

          <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
            로그인
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AdminLoginPage;
