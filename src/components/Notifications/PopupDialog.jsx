import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PopupDialog(props) {
  const { title, info, handleResponse, isReady } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (isReady != undefined) {
      var ready = isReady();
      console.log("ready: ", ready);
      if (!ready) {
        return;
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    handleResponse(false);
    setOpen(false);
  };

  const handleConfirm = () => {
    handleResponse(true);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Hell yeah!
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Oops, no....
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
