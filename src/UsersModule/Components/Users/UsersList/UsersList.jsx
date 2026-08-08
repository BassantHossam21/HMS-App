import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  TableFooter,
  TablePagination,
  Box,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useUsers from "@/Hooks/useUsers";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";

// ============================== 1. COMPONENT ============================
export default function UsersList() {
  // --- States ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Custom Hooks & Data ---
  const { users, totalCount, loading, getAllUsers } = useUsers();

  // --- API Calls ---
  useEffect(() => {
    getAllUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

  // ============================== 2. EVENT HANDLERS ============================
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ============================== 3. RENDER ============================
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
            Users Table Details
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
                "Profile",
                "Username",
                "Email",
                "Phone",
                "Country",
                "Role",
                "Verified",
                "Created At",
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
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:hover": { backgroundColor: "#F8F9FB" },
                    transition: "0.3s",
                  }}
                >
                  {/* Avatar */}
                  <TableCell>
                    <Avatar
                      src={user.profileImage}
                      alt={user.userName}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>

                  {/* User Details */}
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>

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
                <TableCell colSpan={9} align="center">
                  <Typography>No users found</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>

          {/* ================= TABLE FOOTER (PAGINATION) ================= */}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalCount}
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
