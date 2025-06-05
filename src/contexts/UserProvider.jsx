import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const uId = localStorage.getItem("uId");
    const aId = localStorage.getItem("aId");
    const role = localStorage.getItem("role");

    console.log("[UserProvider] 복원 시도: ", { token, uId, aId, role });

    if (!token) {
      console.log("[UserProvider] 토큰 없음 → 비로그인 처리");
      setLoading(false);
      return;
    }// 토큰 없으면 아무것도 하지 않음

    // 관리자 먼저 확인 (우선순위 높임)
    if (aId && role) {
      console.log("[UserProvider] 관리자 로그인 복원됨");
      setUser({
        id: aId,
        name: null,
        token,
        role,
        type: "admin",
      });
      setLoading(false);
      return;
    }

    // 일반 사용자 처리
    if (uId) {
      console.log("[UserProvider] 일반 사용자 로그인 복원 시도");
      axios
        .get(`/api/user/${uId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("[UserProvider] 사용자 이름 가져오기 성공:", res.data.name);
          setUser({
            id: uId,
            name: res.data.name,
            token,
            role: "USER",
            type: "user",
          });
        })
        .catch((err) => {
          console.error("[UserProvider] 사용자 정보 불러오기 실패:", err.response?.data || err.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("uId");
          localStorage.removeItem("role");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // 로그인 함수 (로그인 시 호출)
  const loginUser = ({ id, token, role = "USER", type = "user" }) => {
    setUser({
      id,
      name: null, // 이름은 다시 불러올 수도 있음
      token,
      role,
      type,
    });
    setLoading(false);
  };

  // 로그아웃 함수
  const logoutUser = () => {
    setUser(null);
    setLoading(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uId");
    localStorage.removeItem("aId");
    localStorage.removeItem("role");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
