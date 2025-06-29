import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const fetchLessons = async (accessToken: string, courseId: string) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/courses/${courseId}/lessons`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Service: Error fetching lessons - ", error);
  }
};

export default fetchLessons;
