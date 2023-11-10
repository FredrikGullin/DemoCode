import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const adminDeleteUser = async (accessToken: string, userId: string) => {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/admin/users/delete/${userId}`,
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

export default adminDeleteUser;
