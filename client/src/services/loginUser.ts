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
    if (axios.isAxiosError(error) && error.response) {
      const serverErrorMessage = error.response.data.message;
      throw new Error(serverErrorMessage || "Login error. Please try again!");
    } else {
      throw new Error("Login error. Please try again.");
    }
  }
};

export default loginUser;
