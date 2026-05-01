import React, { useEffect, useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { toast } from "react-toastify";
import { useAuthAction } from "../Context/AuthActionContext";

export default function useFavorites() {
  const { requireAuthAction } = useAuthAction();
  const [data, setData] = useState([]);

  //============= Get favorite rooms ==============
  const getFavorites = async () => {
    try {
      let response = await axiosClient.get(`/api/v0/portal/favorite-rooms`);
      console.log("FULL FAVORITES RESPONSE:", response.data.data);
      setData(response.data.data.favoriteRooms[0]?.rooms || []);
    } catch (error) {
      console.log(error);
    }
  };

  //============= Add favorite room ==============
  const addFavorite = (id) => {
    // Wrap the action with auth check - only execute if user is logged in
    requireAuthAction(async () => {
      try {
        let response = await axiosClient.post(`/api/v0/portal/favorite-rooms`, {
          roomId: id,
        });

        console.log("API Success:", response.data);
        toast.success(response.data?.message);
        getFavorites();
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    });
  };

  //============= Remove favorite room ==============
  const removeFavorite = (id) => {
    // Wrap the action with auth check - only execute if user is logged in
    requireAuthAction(async () => {
      try {
        let response = await axiosClient.delete(
          `/api/v0/portal/favorite-rooms/${id}`,
          {
            data: { roomId: id },
          },
        );

        console.log("API Success:", response.data);
        toast.success(response.data?.message || "Removed from favorites");
        getFavorites();
      } catch (error) {
        console.error("Remove Favorite Error:", error.response?.data);
        toast.error(error.response?.data?.message || "Failed to remove");
      }
    });
  };

  useEffect(() => {
    // Only fetch favorites if user is logged in
    const token = localStorage.getItem("access_token");
    if (token) {
      getFavorites();
    }
  }, []);

  return { addFavorite, removeFavorite, data };
}
