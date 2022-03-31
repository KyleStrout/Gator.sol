import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          navigator.clipboard.writeText(props.content);
          setOpen(true);
        }}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Address copied to clipboard"
        action={action}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </div>
  );
}
