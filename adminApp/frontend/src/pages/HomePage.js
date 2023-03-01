import * as React from "react";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button, Grid, IconButton, Snackbar, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { deepOrange } from "@mui/material/colors";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { ApiConstants } from "../util/ApiConstants";
import { RestApiService } from "../util/RestApiService";
import { Add, Close } from "@mui/icons-material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HomePage() {
  const cardHeight = 160;
  const cardWidth = 260;
  const textColor = "#EB723F";
  const batchColor = "#FA2F2F";

  const [prevHistoryLength, setPrevHistoryLength] = React.useState(-1);
  const [alluserHistory, setAllUserHistory] = React.useState([]);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const getAllUserHistory = async () => {
    await RestApiService.get(ApiConstants.getAllUserHistory)
      .then((result) => {
        var sortedHistoryData = result.data
          .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
        setAllUserHistory(sortedHistoryData);
      });
  }

  function getRealtimeData(data) {
    setPrevHistoryLength(prevHistoryLength => {
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
    sse.onmessage = e => {
      console.log(e);
      getRealtimeData(JSON.parse(e.data));
    };
    sse.onerror = (error) => {
      console.log("SSE error");
      console.log(error);
      sse.close();
    }
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
  }

  function CardView({ title, batchText, onClick }) {
    return (
      <Paper
        elevation={5}
      >
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
          }}
        >
          <Stack alignItems="center">
            <Typography
              sx={{
                color: textColor,
                fontSize: 22,
                fontWeight: "bold"
              }}
            >
              {title}
            </Typography>
            <Avatar sx={{
              bgcolor: batchColor,
              width: 56,
              height: 56
            }}>{batchText}</Avatar>
          </Stack>
        </Button>
      </Paper>
    )
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
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90vh"
    }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={12}>
            <Grid item>
              <CardView title={"Borrow Request"} batchText={prevHistoryLength} />
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
              <CardView title={"Books Available"} batchText={"0"} />
            </Grid>
            <Grid item>
              <CardView title={"Add Book"} batchText=<Add /> />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          alluserHistory.length == 0
            ? ""
            : `New Book Issued. Book Id: ${alluserHistory[0].bookId}, 
            Book Copy Id: ${alluserHistory[0].copyId}, Title: ${formatString(alluserHistory[0].bookTitle)}`
        }
        action={action}
      />
    </div>
  );
}
