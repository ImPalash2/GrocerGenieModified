import axios from "axios";

export const signup = async (cred) => {
  console.log("Hello from signup");
  try {
    const res = await axios.post("/auth/signup", cred);
    return res.data;
  } catch (error) {
    console.log("Their is something error....");
    throw error.response.data;
  }
};
export const login = async (cred) => {
  try {
    const res = await axios.post("/auth/login", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const verifyOtp = async (cred) => {
  try {
    const res = await axios.post("/auth/verify-otp", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const resendOtp = async (cred) => {
  try {
    const res = await axios.post("/auth/resend-otp", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const forgotPassword = async (cred) => {
  try {
    const res = await axios.post("/auth/forgot-password", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const resetPassword = async (cred) => {
  try {
    const res = await axios.post("/auth/reset-password", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const checkAuth = async (cred) => {
  try {
    const res = await axios.get("/auth/check-auth");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const res = await axios.get("/auth/logout");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
