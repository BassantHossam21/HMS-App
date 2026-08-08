import React, { useEffect, useState } from "react";
import axiosClient from "@/Api/AxiosClient";
import { toast } from "react-toastify";

export default function useAds() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);


  // ===================== Get Ads =================
  const getAds = async (page = 0, size = 10) => {
    setLoading(true);
    try {
      let response = await axiosClient.get(
        `/api/v0/admin/ads?page=${page + 1}&size=${size}`,
      );
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

  // ===================== Delete Ads =================
  const deleteAds = async (id) => {
    setLoading(true);
    try {
      let response = await axiosClient.delete(`/api/v0/admin/ads/${id}`);
      toast.success(response.data.message || "Ad deleted successfully");
      await getAds();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting ad");
    } finally {
      setLoading(false);
    }
  };

  // ===================== Add Ads =================
  const addAds = async (data) => {
    setLoading(true);
    try {
      let response = await axiosClient.post(`/api/v0/admin/ads`, data);
      toast.success(response.data.message);
      await getAds();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // ===================== Update Ads =================
  const updateAds = async (id, data) => {
    console.log("Updating Ad ID:", id, "Payload:", data);
    setLoading(true);
    try {
      let response = await axiosClient.put(`/api/v0/admin/ads/${id}`, data);
      toast.success(response.data.message);
      await getAds();
    } catch (error) {
      console.error(
        "Update Ads Error Response:",
        JSON.stringify(error.response?.data),
      );
      toast.error(error.response?.data?.message || "Failed to update ad");
    } finally {
      setLoading(false);
    }
  };

  return { data, total, getAds, loading, deleteAds, addAds, updateAds };
}
