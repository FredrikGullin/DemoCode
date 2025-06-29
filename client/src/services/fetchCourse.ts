import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const fetchCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Service: Error fetching course - ", error);
  }
};

export default fetchCourse;
