import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const handlePurchaseCourse = async (
  id: string,
  accessToken: string,
  setAuthData: (data: any) => void
) => {
  if (!accessToken) {
    throw new Error("No access token available!");
  }

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
    console.log("Response-obj: ", response);
    return response.data;
  } catch (error) {
    throw new Error(`Something went wrong! ${error}`);
  }
};

export default handlePurchaseCourse;
