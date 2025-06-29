import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

const searchService = async (query: string) => {
  try {
    const result = await axios.post(`${SERVER_URL}/courses/search`, {
      search: query,
    });
    return result.data;
  } catch (error) {
    console.error("Service: Search error - ", error);
  }
};

export default searchService;
