import React, { useEffect, useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { toast } from "react-toastify";

export default function useAds() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getAds = async () => {
    setLoading(true);
    try {
      let response = await axiosClient.get(`/api/v0/admin/ads`);
      console.log(response);
      setData(response.data.data.ads);
      setTotal(response.data.data.totalCount);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch ads");
    } finally {
      setLoading(false);
    }
  };

  const deleteAds = async (id) => {
    try {
      let response = await axiosClient.delete(`/api/v0/admin/ads/${id}`);
      toast.success(response.data.message || "Ad deleted successfully");
      getAds();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting ad");
    }
  };

  const addAds = async (data) => {
    try {
      let response = await axiosClient.post(`/api/v0/admin/ads`, data);
      toast.success(response.data.message);
      getAds();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  const updateAds = async (id, data) => {
    console.log("Updating Ad ID:", id, "Payload:", data);
    try {
      let response = await axiosClient.put(`/api/v0/admin/ads/${id}`, data);
      toast.success(response.data.message);
      getAds();
    } catch (error) {
      console.error(
        "Update Ads Error Response:",
        JSON.stringify(error.response?.data),
      );
      toast.error(error.response?.data?.message || "Failed to update ad");
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  return { data, total, getAds, loading, deleteAds, addAds, updateAds };
}
