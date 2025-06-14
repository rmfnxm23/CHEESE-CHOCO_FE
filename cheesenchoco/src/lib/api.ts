import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경변수 사용
  withCredentials: true,
});

export default api;
