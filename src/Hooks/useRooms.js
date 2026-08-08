import { useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useRooms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  // ===================== Fetch Rooms =====================
  const fetchRooms = async (page = 1, size = 20) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/api/v0/admin/rooms?page=${page}&size=${size}`,
        { headers: getHeaders() },
      );
      return {
        rooms: res.data.data.rooms,
        totalCount: res.data.data.totalCount,
      };
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch rooms ❌");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===================== Get Room By ID =====================
  const getRoomById = async (id) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/v0/admin/rooms/${id}`, {
        headers: getHeaders(),
      });
      return res.data.data.room;
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch room details ❌",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===================== Create Room =====================
  const createRoom = async (formData) => {
    setLoading(true);
    try {
      const res = await axiosClient.post(`/api/v0/admin/rooms`, formData, {
        headers: {
          ...getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard/rooms");
      toast.success(res.data?.message || "Room added successfully ✅");
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add room ❌");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===================== Update Room =====================
  const updateRoom = async (id, formData) => {
    setLoading(true);
    try {
      const res = await axiosClient.put(`/api/v0/admin/rooms/${id}`, formData, {
        headers: {
          ...getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard/rooms");
      toast.success(res.data?.message || "Room updated successfully ✅");
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update room ❌");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===================== Delete Room =====================
  const deleteRoom = async (id) => {
    setLoading(true);
    try {
      const res = await axiosClient.delete(`/api/v0/admin/rooms/${id}`, {
        headers: getHeaders(),
      });
      toast.success(res.data?.message || "Room deleted successfully ✅");
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete room ❌");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===================== Fetch Facilities =====================
  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/v0/admin/room-facilities`, {
        headers: getHeaders(),
      });
      return res.data.data.facilities;
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch facilities ❌",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    fetchFacilities,
  };
}
