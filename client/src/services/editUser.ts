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
  if (!accessToken) {
    throw new Error("No access token available!");
  }

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
    console.log("Resoponse from service: ", response.data);
    console.log("Response 2 from service: ", accessToken);
    const updatedAuthData = response.data;
    setAuthData(updatedAuthData);
    return response.data;
  } catch (error) {
    console.error("Error updating user information!");
  }
};

export default editUser;
