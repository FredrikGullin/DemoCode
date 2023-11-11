import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const adminUpdateUser = async (
  accessToken: string,
  userId: string,
  updateData: {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
  }
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.put(
      `${SERVER_URL}/admin/users/update/${userId}`,
      updateData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Service: Error updating user information - ", error);
  }
};

export default adminUpdateUser;
