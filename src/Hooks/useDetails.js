import React, { useEffect, useState } from "react";
import axiosClient from "./../Api/AxiosClient";

export default function useDetails() {
  const [data, setData] = useState([]);
  //============================ Get All Ads ===============================
  const getAllDetails = async () => {
    try {
      // call api to get details;
      let response = await axiosClient.get("/api/v0/portal/ads");
      console.log(response.data.data.ads);
      setData(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
  };


  

  useEffect(() => {
    getAllDetails();
  }, []);
  return { data };
}
