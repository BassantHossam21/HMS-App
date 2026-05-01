import { useEffect, useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function useLandingRooms() {
  const location = useLocation();
  const { startDate, endDate, capacity } = queryString.parse(location.search);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [roomDetails, setRoomDetails] = useState(null);

  const fetchRooms = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/v0/portal/rooms/available", {
        params: {
          page: currentPage,
          size: 10,
          startDate,
          endDate,
          capacity,
        },
      });

      if (response.data.success) {
        setRooms(response.data.data.rooms);
        setTotalCount(response.data.data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoomDetailsById = async (roomId) => {
    try {
      const response = await axiosClient.get(`/api/v0/portal/rooms/${roomId}`);
      console.log("Room details:", response.data.data.room);
      setRoomDetails(response.data.data.room);

    } catch (error) {
      console.error("Error fetching room details:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchRooms(page);
  }, [page, startDate, endDate, capacity]);

  return {
    rooms,
    loading,
    page,
    totalCount,
    setPage,
    getRoomDetailsById,
    roomDetails,
  };
}
