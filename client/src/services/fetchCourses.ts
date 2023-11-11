import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error("Service: Error fetching courses - ", error);
  }
};
