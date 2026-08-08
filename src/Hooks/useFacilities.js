import { useState, useCallback } from "react";
import axiosClient from "@/Api/AxiosClient";
import { toast } from "react-toastify";

export default function useFacilities() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //================== All Facilities ==================
  const getFacilities = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/api/v0/admin/room-facilities?page=${page + 1}&size=${size}`,
      );
      setData(response.data.data.facilities);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch facilities");
    } finally {
      setLoading(false);
    }
  }, []);

  //================== Delete Facility ===================
  const deleteFacility = async (id, page = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await axiosClient.delete(
        `/api/v0/admin/room-facilities/${id}`,
      );
      toast.success(response.data.message);
      await getFacilities(page, size);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting facility");
    } finally {
      setLoading(false);
    }
  };

  //================== Add Facility ===================
  const addFacility = async (facilityName, page = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(`/api/v0/admin/room-facilities`, {
        name: facilityName,
      });
      toast.success(response.data.message);
      await getFacilities(page, size);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding facility");
    } finally {
      setLoading(false);
    }
  };

  //================== Update Facility ===================
  const updateFacility = async (id, facilityData, page = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await axiosClient.put(
        `/api/v0/admin/room-facilities/${id}`,
        facilityData,
      );
      toast.success(response.data.message);
      await getFacilities(page, size);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating facility");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    totalCount,
    loading,
    getFacilities,
    deleteFacility,
    addFacility,
    updateFacility,
  };
}
