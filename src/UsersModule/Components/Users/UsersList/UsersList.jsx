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
} from "@mui/material";
import useUsers from "../../../../Hooks/useUsers";

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
   <Box >
     <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">UsersList Table Details </Typography>
          <Typography variant="body2" color="textPrimary">
            You can check all details
          </Typography>
        </Grid>
      </Grid>
   </Box>
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
       
       
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#E2E5EB",
            "& .MuiTableCell-root": { color: "black", fontWeight: "bold" },
          }}
        >
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Verified</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:hover": { backgroundColor: "#f5f5f5" }, transition: "0.3s" }}
              >
                <TableCell>
                  <Avatar src={user.profileImage} alt={user.userName} sx={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
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

        <TableFooter>
          <TableRow>
            <TablePagination
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50]}
              labelRowsPerPage="Rows per page"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
   </>
  );
}
