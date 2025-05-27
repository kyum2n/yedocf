import { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [Id, setId] = useState("");
    const [Pwd, setPwd] = useState("");

    const handleLogin = () => {
        if (Id && Pwd) {
            onLogin();
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 rounded-md shadow-lg ">
            <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
            <input
                type="Id"
                placeholder="이메일"
                value={Id}
                onChange={(e) => setId(e.target.value)}
                className="input" />
            <input
                type="password"
                placeholder="비밀번호"
                value={Pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="input mt-2" />
            <button onClick={handleLogin} className="btn mt-4 w-full">로그인</button>
        </div>
    );
};

export default LoginPage;
