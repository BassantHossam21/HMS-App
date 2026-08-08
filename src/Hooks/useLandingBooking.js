import { useState } from "react";
import axiosClient from "../Api/AxiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useLandingBooking() {
    const [loading, setLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const navigate = useNavigate();

    //=============== booking the room===============
    const bookRoom = async (bookingData) => {
        setLoading(true);
        try {
            const response = await axiosClient.post(
                "/api/v0/portal/booking",
                bookingData,
            );
            toast.success(response.data?.message || "Booking successful!");

            // Navigate to the payment page with the generated booking ID
            navigate(`/payment/${response.data.data.booking._id}`);
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Booking failed. Please try again.",
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //=============== get booking details ===============
    const getBooking = async (bookingId) => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`/api/v0/portal/booking/${bookingId}`);
            setBookingDetails(
                res.data.data?.booking || res.data.data || res.data.booking,
            );
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to fetch booking data",
            );
        } finally {
            setLoading(false);
        }
    };

    //=============== pay booking ===============
    const payBooking = async (bookingId, tokenId) => {
        setLoading(true);
        try {
            const response = await axiosClient.post(`/api/v0/portal/booking/${bookingId}/pay`, {
                token: tokenId,
            });
            toast.success(response.data?.message || "Payment successful");
            navigate(`/payment-success/${bookingId}`);
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "An error occurred during payment",
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        bookRoom,
        getBooking,
        payBooking,
        bookingDetails,
        loading,
    };
}
