import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { deepOrange } from "@mui/material/colors";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { ApiConstants } from "../util/ApiConstants";
import { RestApiService } from "../util/RestApiService";
import { Add, Close } from "@mui/icons-material";
import UnavailableBooks from "./UnavailableBooks";
import AddNewBook from "./AddNewBook";
import BorrowRequestPage from "./BorrowRequestPage";

export default function HomePage() {
  const cardHeight = 160;
  const cardWidth = 260;
  const textColor = "#EB723F";
  const batchColor = "#FA2F2F";

  const [prevHistoryLength, setPrevHistoryLength] = React.useState(-1);
  const [alluserHistory, setAllUserHistory] = React.useState([]);
  const [allActiveRequest, setAllActiveRequest] = React.useState([]);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const [currentPopupView, setCurrentPopupView] = React.useState(<div></div>);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const [newBookPopup, setNewBookPopup] = React.useState(false);

  const [notAvailableBooks, setNotAvailableBooks] = React.useState([]);

  const getAllBooks = async () => {
    await RestApiService.post(
      ApiConstants.getBooks,
      {
        Authorization: "any-auth-token",
      },
      {
        search: "all",
      }
    ).then((result) => {
      setNotAvailableBooks(result.data.filter((obj) => obj.available == false));
    });
  };

  React.useEffect(() => {
    console.log(notAvailableBooks);
    getActiveBorrowRequests();
    getAllBooks();
  }, []);

  React.useEffect(() => { }, [notAvailableBooks]);

  const modalStyle = {
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

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const getAllUserHistory = async () => {
    await RestApiService.get(ApiConstants.getAllUserHistory).then((result) => {
      console.log(result.data);
      var sortedHistoryData = result.data.sort(
        (a, b) => new Date(b.issueDate) - new Date(a.issueDate)
      );
      setAllUserHistory(sortedHistoryData);
      console.log(alluserHistory);
    });
  };
  const getActiveBorrowRequests = async () => {
    await RestApiService.get(ApiConstants.getAllActiveBorrowRequest).then(
      (result) => {
        console.log(result.data);
        setAllActiveRequest(result.data);
        console.log(allActiveRequest);
      }
    );
  };

  function getRealtimeData(data) {
    setPrevHistoryLength((prevHistoryLength) => {
      if (prevHistoryLength == -1) {
        // setting history length for first time
        console.log("setting history length for first time");
      } else if (prevHistoryLength != data.data) {
        getAllUserHistory();
        handleClick();
      }
      return data.data;
    });
  }

  React.useEffect(() => {
    const sse = new EventSource(ApiConstants.sseApi);
    sse.onmessage = (e) => {
      // console.log(e);
      getRealtimeData(JSON.parse(e.data));
    };
    sse.onerror = (error) => {
      console.log("SSE error");
      console.log(error);
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  const formatString = (str) => {
    if (str.length <= 8) {
      return str;
    } else {
      return str.substring(0, 8) + "...";
    }
  };

  function CardView({ title, batchText, onClick, popUpView }) {
    return (
      <Paper elevation={5}>
        <Button
          elevation={5}
          sx={{
            height: cardHeight,
            width: cardWidth,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            console.log("HELLO");
            // getAllUserHistory();
            // getActiveBorrowRequests();
            if (onClick != null) {
              onClick();
            }
            if (popUpView != null) {
              setCurrentPopupView(popUpView);
            } else {
              setCurrentPopupView(
                <BorrowRequestPage
                  ActiveRequest={allActiveRequest}
                ></BorrowRequestPage>
              );
            }
            handleModalOpen();
          }}
        >
          <Stack alignItems="center">
            <Typography
              sx={{
                color: textColor,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
            <Avatar
              sx={{
                bgcolor: batchColor,
                width: 56,
                height: 56,
              }}
            >
              {batchText}
            </Avatar>
          </Stack>
        </Button>
      </Paper>
    );
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={12}>
            <Grid item>
              <CardView
                title={"Borrow Request"}
                batchText={
                  allActiveRequest.length == 0 ? (
                    <CircularProgress disableShrink color="inherit" />
                  ) : (
                    allActiveRequest.length
                  )
                }
              />
            </Grid>
            <Grid item>
              <CardView title={"Extension"} batchText={"0"} />
            </Grid>
            <Grid item>
              <CardView title={"Defaulters"} batchText={"0"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={10}>
          <Grid container justifyContent="center" spacing={12}>
            <Grid item>
              <CardView
                title={"Unavailable Books"}
                batchText={notAvailableBooks.length}
                popUpView=<UnavailableBooks bookList={notAvailableBooks} />
              />
            </Grid>
            <Grid item>
              <CardView
                title={"Add Book"}
                batchText=<Add />
                popUpView=<AddNewBook
                  openPopup={() => {
                    handleModalClose();
                    setNewBookPopup(true);
                  }}
                />
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "80vw",
          height: "60vh",
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          overflowY: "scroll",
          p: 4,
        }}>
          {currentPopupView}
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          alluserHistory.length == 0
            ? ""
            : `New Book Issued. Book Id: ${alluserHistory[0].bookId}, 
            Book Copy Id: ${alluserHistory[0].copyId}, Title: ${formatString(
              alluserHistory[0].bookTitle
            )}`
        }
        action={action}
      />
      <Snackbar
        open={newBookPopup}
        autoHideDuration={6000}
        onClose={() => setNewBookPopup(false)}
      >
        <Alert
          onClose={() => setNewBookPopup(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          New Book Added!
        </Alert>
      </Snackbar>
    </div>
  );
}
