/**
 * packageName    : src.pages.user
 * fileName       : NoticeEventPage.jsx
 * author         : jkw
 * date           : 25.06.11
 * description    : 공지사항 및 이벤트 사용자 페이지
 * ===========================================================
 */

// import React, { useEffect, useState } from "react";
// import { getAllNoticeEvents } from "../../api/noticeEvent";

// const NoticeEventPage = () => {
//     const [notices, setNotices] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await getAllNoticeEvents();
//             setNotices(data);
//         };
//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h2>공지사항 / 이벤트</h2>
//             {notices.map((item) => (
//                 <div key={item.neId} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//                     <h3>{item.neTitle} ({item.neType})</h3>
//                     <p>{item.neContent}</p>
//                     {item.neImageUrl && (
//                         <img src={item.neImageUrl} alt={item.neTitle} width="300px" />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default NoticeEventPage;


import React, { useEffect, useState } from "react";
import { getAllNoticeEvents } from "@/api/noticeEvent";
import BannerSection from "@/components/common/BannerSection";
import { banner4 } from '@/assets/cdnImages'; // 배너 이미지 경로
import NoticeEventCard from "@/components/common/NoticeEventCard";

const NoticeEventPage = () => {
  const [noticeEvents, setNoticeEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllNoticeEvents();
        setNoticeEvents(response);
      } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <BannerSection 
        title="공지사항 / 이벤트" 
        image={banner4} 
        objectPosition="object-[50%_30%]" 
      />

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {noticeEvents.map(item => (
          <NoticeEventCard key={item.neId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NoticeEventPage;