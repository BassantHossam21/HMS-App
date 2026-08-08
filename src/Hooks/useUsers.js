import { useState, useEffect } from "react";
import axiosClient from "../Api/AxiosClient";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //===================Get All Users===================
  const getAllUsers = async (page, rowsPerPage) => {
    if (page === undefined || rowsPerPage === undefined) return;

    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/api/v0/admin/users?page=${page + 1}&size=${rowsPerPage}`,
      );
      setUsers(res.data.data.users);
      setTotalCount(res.data.data.totalCount);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  //===================Get User Profile===================
  const getUserProfile = async (id) => {
    try {
      const res = await axiosClient.get(`/api/v0/admin/users/${id}`);
      return res.data.data; // Adjust based on actual API response structure
    } catch (err) {
      console.error("Error fetching user profile:", err);
      throw err;
    }
  };

  return { users, totalCount, loading, getAllUsers, getUserProfile };
}
