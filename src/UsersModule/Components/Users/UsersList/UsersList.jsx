import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Avatar,
  Typography,
  TableFooter,
  TablePagination,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useUsers from "@/Hooks/useUsers";

export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { users, totalCount, loading } = useUsers(page, rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {/* ================= PAGE HEADER SECTION ================= */}
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">UsersList Table Details </Typography>
            <Typography variant="body2" color="textPrimary">
              You can check all details
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* ================= TABLE CONTAINER ================= */}
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
        <Table>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
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
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>No users found</Typography>
                </TableCell>
              </TableRow>
            )}
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
