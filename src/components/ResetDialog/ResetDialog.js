import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

export default function ResetDialog(props) {
  const { onClose, open, reset } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle align="center">Reset code?</DialogTitle>
      <DialogActions>
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#388e3c" }}
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#d32f2f" }}
            onClick={() => {
              onClose();
            }}
          >
            No
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

ResetDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};
