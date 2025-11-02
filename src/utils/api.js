import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "https://workflow-healer11-2.onrender.com";

export const api = axios.create({
  baseURL: BACKEND,
  timeout: 8000,
});
