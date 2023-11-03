import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const logoutUser = async (token: string) => {
  try {
    await axios.post(
      `${SERVER_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    sessionStorage.removeItem("accessToken");
  } catch (error) {
    throw new Error("There was an error logging out!");
  }
};

export default logoutUser;
