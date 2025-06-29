import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const fetchLesson = async (
  accessToken: string,
  courseId: string,
  lessonId: string
) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/courses/${courseId}/lessons/${lessonId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Service: Error fetching lesson - ", error);
  }
};

export default fetchLesson;
