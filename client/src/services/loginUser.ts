import axios from "axios";
import { LoginResponseInterface } from "../interfaces/loginResponse";

const SERVER_URL = import.meta.env.VITE_API_URL;

const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post<LoginResponseInterface>(
      `${SERVER_URL}/users/login`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Service: Error logging in user - ", error);
  }
};

export default loginUser;
