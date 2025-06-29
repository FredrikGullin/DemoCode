import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const fetchUser = async (accessToken: string, userId: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Service: Error fetching user - ", error);
  }
};

export default fetchUser;
