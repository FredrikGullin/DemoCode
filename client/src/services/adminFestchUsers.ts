import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const adminFetchUsers = async (accessToken: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("service: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed fetching users.", error);
  }
};

export default adminFetchUsers;
