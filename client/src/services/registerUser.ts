import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${SERVER_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data);
      } else if (error.request) {
        throw new Error("Server did not respond...");
      } else {
        throw new Error(error.message);
      }
    }
  }
};

export default registerUser;
