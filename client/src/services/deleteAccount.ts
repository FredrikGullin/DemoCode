import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const deleteAccount = async (accessToken: string, userId: string) => {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/users/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};

export default deleteAccount;
