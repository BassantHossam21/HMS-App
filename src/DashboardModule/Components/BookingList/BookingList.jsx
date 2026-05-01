import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useBookingApi } from "../../../Hooks/useBooking";

export default function BookingList() {
  const { loading, data, getBookings } = useBookingApi();

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Booking Table Details </Typography>
          <Typography variant="body2" color="textPrimary">
            You can check all details
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, overflowY: "hidden" }}>
        <TableContainer component={Paper}>
          {" "}
          {/* غير Table لـ Paper */}
          <Table aria-label="striped table">
            <TableHead sx={{ borderRadius: 25, p: 3 }}>
              <TableRow sx={{ backgroundColor: "#E2E5EB", borderRadius: 5 }}>
                <TableCell
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    p: 3,
                  }}
                >
                  room Number
                </TableCell>
                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: "bold" }}
                  align="center"
                >
                  Start Date
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: "bold" }}
                  align="center"
                >
                  End Date
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: "bold" }}
                  align="center"
                >
                  User
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: "bold" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& tr:nth-of-type(odd)": {
                  backgroundColor: "#fff",
                },
                "& tr:nth-of-type(even)": {
                  backgroundColor: "#eeeeeeff",
                },
              }}
            >
              {data?.booking?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell sx={{ p: 3 }} component="th" scope="row">
                    {item.room?.roomNumber ? item.room?.roomNumber : "N/A"}
                  </TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell align="center">
                    {new Date(item.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(item.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{item.user?.userName}</TableCell>
                  <TableCell align="center">
                    <RemoveRedEyeIcon sx={{ color: "#203FC7", fontSize: 15 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
