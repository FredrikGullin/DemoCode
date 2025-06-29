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
    window.location.reload();
  } catch (error) {
    console.error("Service: Error logging out user - ", error);
  }
};

export default logoutUser;
