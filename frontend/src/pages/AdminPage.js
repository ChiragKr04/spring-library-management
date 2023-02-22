import { Check, Close, Person } from '@mui/icons-material';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ApiConstants } from '../util/ApiConstants';
import { RestApiService } from '../util/RestApiService';

export default function AdminPage() {

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

  const formatString = (str) => {
    if (str.length <= 8) {
      return str;
    } else {
      return str.substring(0, 8) + "...";
    }
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

  const getAllUserHistory = async () => {
    await RestApiService.get(ApiConstants.getAllUserHistory)
      .then((result) => {
        var sortedHistoryData = result.data
          .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
        setAllUserHistory(sortedHistoryData);
      });
  }



  React.useEffect(() => {
    getAllUserHistory();
  }, []);

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
    sse.onmessage = e => getRealtimeData(JSON.parse(e.data));
    sse.onerror = (error) => {
      console.log("SSE error");
      console.log(error);
      sse.close();
    }
    return () => {
      sse.close();
    };
  }, []);

  return (
    <div>
      {
        alluserHistory.length == 0
          ? <div>No Data</div>
          : alluserHistory.map((historyData, index) => {
            return (
              <List key={index}>
                <ListItem
                  secondaryAction={
                    <Grid container>
                      <Grid item m={1}>
                        <IconButton edge="end">
                          <Close sx={{ color: "red" }} />
                        </IconButton>
                      </Grid>
                      <Grid item m={1}>
                        <IconButton edge="end">
                          <Check sx={{ color: "green" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={historyData.bookTitle}
                    secondary={`Book Id:${historyData.bookId}, Book Copy Id:${historyData.copyId}`}
                  />
                </ListItem>
              </List>
            )
          })
      }
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
  )
}
