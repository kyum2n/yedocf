/**
 * packageName    : src.pages.user
 * fileName       : NoticeEventManagePage.jsx
 * author         : jkw
 * date           : 25.06.11
 * description    : 공지사항 및 이벤트 관리자 페이지
 * ===========================================================
 */

import React, { useState } from "react";
import { createNoticeEvent } from "../../api/noticeEvent";

const NoticeEventManagePage = () => {
    const [form, setForm] = useState({
        neTitle: "",
        neContent: "",
        neImageUrl: "",
        neType: "NOTICE",
        neStartDate: "",
        neEndDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        await createNoticeEvent(form, token);
        alert("등록 성공");
    };

    return (
        <div>
            <h2>공지사항 등록</h2>
            <input name="neTitle" placeholder="제목" onChange={handleChange} />
            <input name="neContent" placeholder="내용" onChange={handleChange} />
            <input name="neImageUrl" placeholder="이미지URL" onChange={handleChange} />
            <select name="neType" onChange={handleChange}>
                <option value="NOTICE">공지</option>
                <option value="EVENT">이벤트</option>
            </select>
            <input name="neStartDate" type="date" onChange={handleChange} />
            <input name="neEndDate" type="date" onChange={handleChange} />
            <button onClick={handleSubmit}>등록하기</button>
        </div>
    );
};

export default NoticeEventManagePage;
