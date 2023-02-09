import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import { RestApiService } from "../util/RestApiService";
import { ApiConstants } from "../util/ApiConstants";
import BookCopiesTable from "./bookCopiesTable";
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

export default function BorrowButtonModal({ e }) {
  const [open, setOpen] = React.useState(false);
  const [bookCopyList, setBookCopiesList] = React.useState([]);
  const handleOpen = () => {
    setOpen(true);
    console.log("handleOpen");
    getCopies(e);
  };
  const handleClose = () => setOpen(false);
  console.log(e);
  const getCopies = async (e) => {
    await RestApiService.get(
      `${ApiConstants.getBookCopies}?bookId=${e.id}`
    ).then((result) => {
      //setBookCopiesList(result["data"]);
      setBookCopiesList(result.data);
      console.log(result.data);
    });
  };

  return (
    <div>
      <Button disabled={!e.available} onClick={handleOpen}>
        Borrow
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img
              alt={e.title}
              src={e.image}
              style={{ width: "60px", height: "70px" }}
            ></img>
            <div id="bookInfo">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <Tooltip title={e.author} placement="top-start">
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      width: "180px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.author}
                  </span>
                </Tooltip>
              </Typography>

              <Typography variant="h6" component="div">
                <Tooltip title={e.title} placement="bottom-start">
                  <span
                  // style={{
                  //   textOverflow: "ellipsis",
                  //   overflow: "hidden",
                  //   width: "250px",
                  //   whiteSpace: "nowrap"
                  // }}
                  >
                    {e.title}
                  </span>
                </Tooltip>
              </Typography>
            </div>
          </div>
          <BookCopiesTable copyList={bookCopyList} />
        </Box>
      </Modal>
    </div>
  );
}
