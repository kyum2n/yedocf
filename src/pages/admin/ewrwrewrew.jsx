/**
 * packageName    : src.pages.user
 * fileName       : NoticeEventManagePage.jsx
 * author         : jkw
 * date           : 25.06.11
 * description    : 공지사항 및 이벤트 관리자 페이지
 * ===========================================================
 */

// import { createNoticeEvent } from "../../api/noticeEvent";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import CustomCKEditor from '@/components/common/CkEditer';
import { getAllNoticeEvents } from "@/api/noticeEvent";

// 게시글 목록 컴포넌트
function BoardList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllNoticeEvents();
        console.log(JSON.stringify(response));
        
        setPosts(response);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <Link to="/write">
        <button>글쓰기</button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
            <h3>{post.neTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <Link to={`/edit/${post.id}`}>
              <button style={{ marginRight: '10px' }}>수정</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// 글쓰기 컴포넌트
function BoardForm({ editData }) {
  const [title, setTitle] = useState(editData?.title || '');
  const [content, setContent] = useState(editData?.content || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await axios.put(`${API_URL}/${editData.id}`, { title, content });
      } else {
        await axios.post(API_URL, { title, content });
      }
      window.location.href = '/';
    } catch (error) {
      console.error('게시글 저장 실패:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>{editData ? '글 수정' : '글쓰기'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <div style={{ minHeight: '400px', marginBottom: '20px' }}>
          <CustomCKEditor value={content} onChange={setContent} />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

function NoticeEventManagePage() {
  return (
    
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/write" element={<BoardForm />} />
        <Route path="/edit/:id" element={<BoardForm />} />
      </Routes>
    
  );
}

export default NoticeEventManagePage;
// const NoticeEventManagePage = () => {
//     const [form, setForm] = useState({
//         neTitle: "",
//         neContent: "",
//         neImageUrl: "",
//         neType: "NOTICE",
//         neStartDate: "",
//         neEndDate: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = async () => {
//         const token = localStorage.getItem("token");
//         await createNoticeEvent(form, token);
//         alert("등록 성공");
//     };

//     return (
//         <div>
//             <h2>공지사항 등록</h2>
//             <input name="neTitle" placeholder="제목" onChange={handleChange} />
//             <input name="neContent" placeholder="내용" onChange={handleChange} />
//             <input name="neImageUrl" placeholder="이미지URL" onChange={handleChange} />
//             <select name="neType" onChange={handleChange}>
//                 <option value="NOTICE">공지</option>
//                 <option value="EVENT">이벤트</option>
//             </select>
//             <input name="neStartDate" type="date" onChange={handleChange} />
//             <input name="neEndDate" type="date" onChange={handleChange} />
//             <button onClick={handleSubmit}>등록하기</button>
//         </div>
//     );
// };

// export default NoticeEventManagePage;


