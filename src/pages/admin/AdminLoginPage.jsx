// src/pages/admin/AdminLoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SidebarMinimal from "@/components/admin/SidebarMinimal";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const AdminLoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 로그인 로직
    try {
      const response = await axios.post("/api/admin/login", {
        aId : form.username,
        aPwd : form.password,
      }
      );

      // 토큰 받기
      const token = response.data.token;
      if(!token) {
        throw new Error("로그인 실패 : 토큰을 받지 못했습니다.");
      }

      // 관리자 권한 확인
      const role = response.data.role || "ADMIN";
      if (role !== "ADMIN" && role !== "SUPERADMIN"){
        throw new Error("로그인 실패 : 관리자 권한이 없습니다.");
      }

      // LocalStorage에 토큰 저장
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("aId", form.username);

      // 로그인 성공 후 대시보드로 이동
      navigate("/admin");

    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");

    }

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
