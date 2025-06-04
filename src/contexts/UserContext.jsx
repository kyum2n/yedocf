import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const uId = localStorage.getItem("uId");
    const aId = localStorage.getItem("aId");
    const role = localStorage.getItem("role");

    if (!token) return; // 토큰 없으면 아무것도 하지 않음

    // 관리자 먼저 확인 (우선순위 높임)
    if (aId && role) {
      setUser({
        id: aId,
        name: null,
        token,
        role,
        type: "admin",
      });
      return;
    }

    // 일반 사용자 처리
    if (uId) {
      axios
        .get(`/api/user/name/${uId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { name } = res.data;

          setUser({
            id: uId,
            name,
            token,
            role: "USER",
            type: "user",
          });
        })
        .catch((err) => {
          console.error("[사용자 이름 불러오기 실패]", err);
          // 전체 clear() 지양, 관리자 정보 날아감
          localStorage.removeItem("accessToken");
          localStorage.removeItem("uId");
          localStorage.removeItem("role");
          setUser(null);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
