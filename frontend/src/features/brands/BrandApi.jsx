import axios from "axios";

export const fetchAllBrands = async () => {
  try {
    const res = await axios.get("/brands");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
