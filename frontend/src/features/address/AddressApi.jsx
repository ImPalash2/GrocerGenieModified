import axios from "axios";

export const addAddress = async (address) => {
  try {
    const res = await axios.post("/address", address);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchAddressByUserId = async (id) => {
  try {
    const res = await axios.get(`/address/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateAddressById = async (update) => {
  try {
    const res = await axios.patch(`/address/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteAddressById = async (id) => {
  try {
    const res = await axios.delete(`/address/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
