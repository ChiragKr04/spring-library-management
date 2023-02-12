import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RestApiService } from "../util/RestApiService";
import { ApiConstants } from "../util/ApiConstants";
import { Alert, Snackbar } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({
  bookCopy,
  userDetail,
  closingModal,
  setResponseOfBookIssueMethod,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cancel = () => {
    handleClose();
    closingModal();
  };
  const confirm = async () => {
    await RestApiService.post(
      ApiConstants.issueBookCopy,
      {
        Authorization: "any-auth-token",
      },
      {
        userId: userDetail.userId,
        bookId: bookCopy.bookId,
        bookCopyId: bookCopy.bookCopyId,
      }
    ).then((result) => {
      // console.log(result.data);
      setResponseOfBookIssueMethod(result.data);
    });
    handleClose();
    closingModal();
  };
  return (
    <div>
      <Button onClick={handleOpen}>Get Book</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want confirm your choice .... ?
          </Typography>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
            }}
          >
            <Button variant="contained" color="error" onClick={cancel}>
              Cancel
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={confirm}
              style={{ marginLeft: "auto" }}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
