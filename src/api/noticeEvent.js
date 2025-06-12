/**
 * packageName    : src.api.noticeEvent
 * fileName       : noticeEvent.js
 * author         : jkw
 * date           : 25.06.11
 * description    : 공지사항 및 이벤트 관리자 API 전용
 * ===========================================================
 */

import axiosInstance from "./axiosInstance";
import publicAxios from "./publicAxios";  // 요거 새로 추가

// 사용자 조회 (공개 API)
export const getAllNoticeEvents = async () => {
  const response = await publicAxios.get(`/api/noticeEvent`);
  return response.data;
};

// 관리자 등록 (인증 필요)
export const createNoticeEvent = async (data) => {
  const response = await axiosInstance.post(`/api/admin/noticeEvent`, data);
  return response.data;
};

// 관리자 수정
export const updateNoticeEvent = async (neId, data) => {
  const response = await axiosInstance.put(`/api/admin/noticeEvent/${neId}`, data);
  return response.data;
};

// 관리자 삭제
export const deleteNoticeEvent = async (neId) => {
  const response = await axiosInstance.delete(`/api/admin/noticeEvent/${neId}`);
  return response.data;
};
