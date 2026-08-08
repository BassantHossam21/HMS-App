import { useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { toast } from "react-toastify";

const useLandingRate = () => {
    const [loading, setLoading] = useState(false);

    const addReview = async (roomId, rating, review) => {
        try {
            setLoading(true);
            const response = await axiosClient.post(`/api/v0/portal/room-reviews`, {
                roomId,
                rating,
                review,
            });
            toast.success(response?.data?.message || "Review added successfully!");
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Failed to add review.");
            throw error;
        }
    };

    return { loading, addReview };
};

export default useLandingRate;
