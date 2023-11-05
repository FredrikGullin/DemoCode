import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const handlePurchaseCourse = async (id: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${SERVER_URL}/courses/${id}/purchase`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Something went wrong! ${error}`);
  }
};

export default handlePurchaseCourse;
