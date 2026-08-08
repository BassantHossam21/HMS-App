import { useState } from "react";

import axiosClient from "../Api/AxiosClient";

export const useBookingApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  //============== Get All Bookings==============
  const getBookings = async (page = 0, size = 10) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(
        `/api/v0/admin/booking?page=${page + 1}&size=${size}`,
      );
      setData(data.data);
      setTotalCount(data.data.totalCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bookings:", error.message);
    }
  };

  return { loading, data, getBookings, totalCount };
};
