import axios from "axios";

export const addToCart = async (item) => {
  try {
    const res = await axios.post("/cart", item);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchCartByUserId = async (id) => {
  try {
    const res = await axios.get(`/cart/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateCartItemById = async (update) => {
  try {
    const res = await axios.patch(`/cart/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteCartItemById = async (id) => {
  try {
    const res = await axios.delete(`/cart/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetCartByUserId = async (userId) => {
  try {
    const res = await axios.delete(`/cart/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
