import axios from "axios";

// central axios config, in real app baseURL would be actual backend
const api = axios.create({
  baseURL: "/api",
});

export default api;
