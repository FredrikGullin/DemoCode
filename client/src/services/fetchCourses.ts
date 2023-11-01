import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

export const fetchCourses = async () => {
  const response = await axios.get(`${SERVER_URL}/courses`);
  return response.data;
};
