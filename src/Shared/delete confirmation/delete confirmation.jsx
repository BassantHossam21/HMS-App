import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import deleteImg from "@/assets/images/Delete.png";

export default function DeleteConfirmation({
  open,
  itemName,
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "15px", p: 2 },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose} size="small">
          <CloseIcon
            sx={{
              color: "red",
              border: "1px solid red",
              borderRadius: "50%",
              fontSize: 16,
              p: 0.2,
            }}
          />
        </IconButton>
      </Box>

      <DialogContent sx={{ textAlign: "center", pb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <img src={deleteImg} alt="Delete" style={{ width: "120px" }} />
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: "700", color: "#333", mb: 1 }}
        >
          Delete This {itemName} Room ?
        </Typography>

        <Typography variant="body2" sx={{ color: "#666", mb: 4, px: 2 }}>
          are you sure you want to delete this item ? if you are sure just
          click on delete it
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#ccc",
              color: "#666",
              textTransform: "none",
              borderRadius: "8px",
              px: { xs: 2, sm: 4 },
              width: { xs: "100%", sm: "auto" },
              "&:hover": { borderColor: "#999", bgcolor: "transparent" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
            sx={{
              backgroundColor: "#ef4444",
              textTransform: "none",
              borderRadius: "8px",
              px: { xs: 2, sm: 4 },
              width: { xs: "100%", sm: "auto" },
              boxShadow: "none",
              "&:hover": { backgroundColor: "#dc2626", boxShadow: "none" },
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#fff" }} />
                <Typography sx={{ fontWeight: "600", color: "#fff", textTransform: "none" }}>Loading...</Typography>
              </Box>
            ) : (
              "Delete"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
