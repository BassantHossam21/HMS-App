import { useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { toast } from "react-toastify";

const useLandingComments = () => {
    const [loading, setLoading] = useState(false);

    //=============== ADD COMMENT ===============
    const addComment = async (roomId, comment) => {
        try {
            setLoading(true);
            const response = await axiosClient.post(`/api/v0/portal/room-comments`, {
                roomId,
                comment,
            });
            toast.success(response?.data?.message || "Comment added successfully!");
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Failed to add comment.");
            throw error;
        }
    };

    return { loading, addComment };
};

export default useLandingComments;
