import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const editUser = async (
  accessToken: string,
  userId: string,
  setAuthData: (data: any) => void,
  updateData: {
    username: string;
    email: string;
    password?: string;
  }
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.put(
      `${SERVER_URL}/users/update/${userId}`,
      updateData,
      config
    );
    const updatedAuthData = response.data;
    setAuthData(updatedAuthData);
    return response.data;
  } catch (error) {
    console.error("Service: Error updating user information - ", error);
  }
};

export default editUser;
