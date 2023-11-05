import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const fetchOwnedCourses = async (token: string, userId: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/${userId}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching courses!", error);
    throw error;
  }
};

export default fetchOwnedCourses;
