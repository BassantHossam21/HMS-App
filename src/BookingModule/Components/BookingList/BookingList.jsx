// ==============================
// 1. IMPORTS
// ==============================
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
  TablePagination,
  Box,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBookingApi } from "@/Hooks/useBooking";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";

// ==============================
// 2. COMPONENT
// ==============================
export default function BookingList() {
  // --- States ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Custom Hooks & Data ---
  const { loading, data, totalCount, getBookings } = useBookingApi();

  // --- API Calls ---
  useEffect(() => {
    getBookings(page, rowsPerPage);
  }, [page, rowsPerPage]);

  // ==============================
  // 3. EVENT HANDLERS
  // ==============================
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ==============================
  // 4. RENDER
  // ==============================
  return (
    <>
      {/* ================= FULL SCREEN LOADING ================= */}
      <LoadingSpinner loading={loading} />

      {/* ================= PAGE HEADER SECTION ================= */}
      <Box
        sx={{
          mb: 4,
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1F263E" }}
          >
            Booking Table Details
          </Typography>
          <Typography variant="body1" sx={{ color: "#6c757d", mt: 0.5 }}>
            You can check all details
          </Typography>
        </Box>
      </Box>

      {/* ================= TABLE CONTAINER ================= */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "12px", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 1000 }}>
          {/* ================= TABLE HEADERS ================= */}
          <TableHead
            sx={{
              backgroundColor: "#E2E5EB",
              "& .MuiTableCell-root": {
                color: "#1F263E",
                fontWeight: "600",
                fontSize: "16px",
                padding: "20px 16px",
              },
            }}
          >
            <TableRow sx={{ height: "80px" }}>
              {[
                "Room Number",
                "Price",
                "Start Date",
                "End Date",
                "User",
                "Actions",
              ].map((headerName) => (
                <TableCell key={headerName}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {headerName}
                    <UnfoldMoreIcon
                      htmlColor="#203FC7"
                      sx={{
                        fontSize: "26px",
                        stroke: "#203FC7",
                        strokeWidth: 0.4,
                      }}
                    />
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* ================= TABLE BODY (DATA) ================= */}
          <TableBody sx={{ "& .MuiTableCell-body": { color: "#3A3A3D" } }}>
            {data?.booking?.length > 0 ? (
              data.booking.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:hover": { backgroundColor: "#F8F9FB" },
                    transition: "0.3s",
                  }}
                >
                  <TableCell>
                    {item.room?.roomNumber ? item.room?.roomNumber : "N/A"}
                  </TableCell>
                  <TableCell>${item.totalPrice}</TableCell>
                  <TableCell>
                    {new Date(item.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.user?.userName}</TableCell>

                  {/* Actions (View Button) */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "#203FC7",
                        cursor: "pointer",
                      }}
                    >
                      <VisibilityIcon sx={{ fontSize: "20px" }} />
                      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                        View
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : !loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No bookings found</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>

          {/* ================= TABLE FOOTER (PAGINATION) ================= */}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalCount || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
                labelRowsPerPage="Showing:"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
