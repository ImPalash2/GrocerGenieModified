import axios from "axios";

export const fetchAllCategories = async () => {
  try {
    const res = await axios.get("/categories");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
