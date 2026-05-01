import { useState, useEffect } from "react";
import axiosClient from "../Api/AxiosClient";


export default function useUsers(page, rowsPerPage) {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(
          `/api/v0/admin/users?page=${page + 1}&size=${rowsPerPage}`
        );
        setUsers(res.data.data.users);
        setTotalCount(res.data.data.totalCount);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  return { users, totalCount, loading };
}
