/**
 * packageName    : src.pages.user
 * fileName       : NoticeEventPage.jsx
 * author         : jkw
 * date           : 25.06.11
 * description    : 공지사항 및 이벤트 사용자 페이지
 * ===========================================================
 */

import React, { useEffect, useState } from "react";
import { getAllNoticeEvents } from "../../api/noticeEvent";
import BannerSection from "@/components/common/BannerSection";
import { banner6 } from "@/assets/cdnImages";

const NoticeEventPage = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllNoticeEvents();
            setNotices(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <BannerSection
                title="공지사항 / 이벤트"
                image={banner6}
                objectPosition="object-[50%_80%]"
            />
            <h2>공지사항 / 이벤트</h2>
            {notices.map((item) => (
                <div key={item.neId} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                    <h3>{item.neTitle} ({item.neType})</h3>
                    <p>{item.neContent}</p>
                    {item.neImageUrl && (
                        <img src={item.neImageUrl} alt={item.neTitle} width="300px" />
                    )}
                </div>
            ))}
        </>
    );
};

export default NoticeEventPage;
