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
    console.error("Service: Error registering user - ", error);
  }
};

export default registerUser;
