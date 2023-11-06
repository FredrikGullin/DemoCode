import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const fetchLessons = async (token: string, courseId: string) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/courses/${courseId}/lessons`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons", error);
  }
};

export default fetchLessons;
