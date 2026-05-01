import { useCallback } from "react";
import axiosClient from "../Api/AxiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useRooms() {
  const navigate = useNavigate();

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchRooms = useCallback(async (page = 1, size = 20) => {
    const res = await axiosClient.get(
      `/api/v0/admin/rooms?page=${page}&size=${size}`,
      { headers: getHeaders() },
    );

    return {
      rooms: res.data.data.rooms,
      totalCount: res.data.data.totalCount,
    };
  }, []);

  const getRoomById = useCallback(async (id) => {
    const res = await axiosClient.get(`/api/v0/admin/rooms/${id}`, {
      headers: getHeaders(),
    });
    return res.data.data.room;
  }, []);

  const createRoom = useCallback(
    async (formData) => {
      try {
        const res = await axiosClient.post(`/api/v0/admin/rooms`, formData, {
          headers: {
            ...getHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/dashboard/rooms");
        return res.data;
      } catch (error) {
        toast.error("Failed to add room ❌");
        throw error;
      }
    },
    [navigate],
  );

  const updateRoom = useCallback(
    async (id, formData) => {
      try {
        const res = await axiosClient.put(
          `/api/v0/admin/rooms/${id}`,
          formData,
          {
            headers: {
              ...getHeaders(),
              "Content-Type": "multipart/form-data",
            },
          },
        );

        navigate("/dashboard/rooms");
        return res.data;
      } catch (error) {
        error.error("Failed to update room ❌");
        throw error;
      }
    },
    [navigate],
  );

  const deleteRoom = useCallback(async (id) => {
    try {
      const res = await axiosClient.delete(`/api/v0/admin/rooms/${id}`, {
        headers: getHeaders(),
      });

      return res.data;
    } catch (error) {
      toast.error("Failed to delete room ❌");
      throw error;
    }
  }, []);

  const fetchFacilities = useCallback(async () => {
    const res = await axiosClient.get(`/api/v0/admin/room-facilities`, {
      headers: getHeaders(),
    });
    return res.data.data.facilities;
  }, []);

  return {
    fetchRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    fetchFacilities,
  };
}
