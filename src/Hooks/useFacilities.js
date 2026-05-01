
import { useEffect, useState, useCallback } from "react";
import axiosClient from "../Api/AxiosClient";
import { toast } from "react-toastify";

export default function useFacilities() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getFacilities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/api/v0/admin/room-facilities`
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

  const deleteFacility = async (id) => {
    try {
      const response = await axiosClient.delete(
        `/api/v0/admin/room-facilities/${id}`
      );
      toast.success(response.data.message);
      getFacilities();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting facility");
    }
  };

  const addFacility = async (facilityName) => {
    try {
      const response = await axiosClient.post(
        `/api/v0/admin/room-facilities`,
        { name: facilityName }
      );
      toast.success(response.data.message);
      getFacilities();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding facility");
    }
  };

  const updateFacility = async (id, facilityData) => {
    try {
      const response = await axiosClient.put(
        `/api/v0/admin/room-facilities/${id}`,
        facilityData
      );
      toast.success(response.data.message);
      getFacilities();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating facility");
    }
  };

  useEffect(() => {
    getFacilities();
  }, [getFacilities]);

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
