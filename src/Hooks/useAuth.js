import { toast } from "react-toastify";
import axiosClient from "../Api/AxiosClient.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";

export default function useAuth() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const register = async (data) => {
    const formData = new FormData();
    // Append text fields
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");

    // Append profile image (file)
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const response = await axiosClient.post("/api/v0/portal/users", formData);
      console.log(response);
      toast.success(response?.data?.message || "Registration successful");
      navigate("/"); // Navigate to login
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };
  const login = async (data) => {
    try {
      localStorage.removeItem("access_token");

      const response = await axiosClient.post(
        "/api/v0/portal/users/login",
        data,
      );

      const { token } = response.data.data;

      localStorage.setItem("access_token", token);

      const decoded = jwtDecode(token.replace("Bearer ", ""));
      setUser(decoded);

      toast.success(response.data.message || "Login successful");

      return decoded;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // ----------------- Logout -----------------
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    navigate("/");
  };

  // ----------------- Forget Password -----------------
  const forgetPassword = async (data) => {
    try {
      const response = await axiosClient.post(
        "/api/v0/portal/users/forgot-password",
        data,
      );
      toast.success(response.data.message || "Password reset email sent");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
      throw err;
    }
  };

  // ----------------- Reset Password -----------------
  const resetPassword = async (data) => {
    try {
      const response = await axiosClient.post(
        "/api/v0/portal/users/reset-password",
        data,
      );
      toast.success(response.data.message || "Password has been reset");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
      throw err;
    }
  };

  // ----------------- Change Password -----------------
  const changePassword = async (data) => {
    try {
      const res = await axiosClient.post(
        "/api/v0/portal/users/change-password",
        data,
      );
      toast.success(res?.data?.message || "Password changed successfully");
      console.log("Password change response:", res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password!");
      throw err;
    }
  };

  return {
    login,
    logout,
    register,
    forgetPassword,
    resetPassword,
    changePassword,
  };
}
