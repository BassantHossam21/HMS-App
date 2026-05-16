import { useState } from "react";
import axiosClient from "../Api/AxiosClient";

export default function useDashboard() {
  const [chartsData, setChartsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDashboardCharts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/api/v0/admin/dashboard");
      setChartsData(res.data?.data || res.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { chartsData, loading, getDashboardCharts };
}
