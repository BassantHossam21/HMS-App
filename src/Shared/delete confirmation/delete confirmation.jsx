import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import deleteImg from "../../assets/images/delete-img.png";
export default function DeleteConfirmation({
  open,
  itemName,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <img src={deleteImg} alt="Delete" style={{ width: '150px', display: 'block', margin: '0 auto 60px' }} />
        <Typography>
          Are you sure you want to delete{" "}
          <strong>{itemName }</strong>
          room ?
        </Typography>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
