import { useState, useEffect } from "react";
import axiosClient from "../Api/AxiosClient";


export default function useUsers(page, rowsPerPage) {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch list if pagination params are provided
    if (page === undefined || rowsPerPage === undefined) return;
    
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(
          `/api/v0/admin/users?page=${page + 1}&size=${rowsPerPage}`
        );
        console.log(res.data.data);
        setUsers(res.data.data.users);
        setTotalCount(res.data.data.totalCount);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  const getUserProfile = async (id) => {
    try {
      const res = await axiosClient.get(`/api/v0/admin/users/${id}`);
      return res.data.data; // Adjust based on actual API response structure
    } catch (err) {
      console.error("Error fetching user profile:", err);
      throw err;
    }
  };

  return { users, totalCount, loading, getUserProfile };
}
