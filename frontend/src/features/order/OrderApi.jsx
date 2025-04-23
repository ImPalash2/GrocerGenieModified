import axios from "axios";

export const createOrder = async (order) => {
  try {
    const res = await axios.post("/orders", order);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderByUserId = async (id) => {
  try {
    const res = await axios.get(`/orders/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllOrders = async () => {
  try {
    const res = await axios.get(`/orders`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateOrderById = async (update) => {
  try {
    const res = await axios.patch(`/orders/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
