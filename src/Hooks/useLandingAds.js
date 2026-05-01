import { useState } from "react";
import { set } from "react-hook-form";
import axiosClient from "../Api/AxiosClient";

export const useAdsApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const getAds = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/api/v0/portal/ads`);
      console.log(data.data.ads);

      setData(data.data.ads);
      setTotalCount(data.data.totalCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching ads:", error.message);
    }
  };
  return { loading, data, getAds, totalCount };
};
