import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const handlePurchaseCourse = async (
  id: string,
  accessToken: string,
  setAuthData: (data: any) => void
) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.put(
      `${SERVER_URL}/courses/${id}/purchase`,
      {},
      { headers }
    );

    const updatedAuthData = response.data;
    setAuthData(updatedAuthData);
    return response.data;
  } catch (error) {
    console.error("Service: Error purchasing course - ", error);
  }
};

export default handlePurchaseCourse;
