import axios from "axios";

export const createReview = async (review) => {
  try {
    const res = await axios.post("/reviews", review);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchReviewsByProductId = async (id) => {
  try {
    const res = await axios.get(`/reviews/product/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateReviewById = async (update) => {
  try {
    const res = await axios.patch(`/reviews/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteReviewById = async (id) => {
  try {
    const res = await axios.delete(`/reviews/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
