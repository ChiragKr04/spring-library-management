import {
  Box,
  Card,
  Chip,
  Grid,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { ApiConstants } from "../util/ApiConstants";
import { RestApiService } from "../util/RestApiService";

export default function HistoryPage({ userDetails }) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const [allBorrowedBooks, setAllBorrowedBooks] = React.useState([]);

  const getUserBookHistory = async () => {
    await RestApiService.post(
      `${ApiConstants.fetchUserHistory}?userId=${userDetails.userId}`
    ).then((res) => {
      console.log(res.data);
      setAllBorrowedBooks(res.data);
      console.log(allBorrowedBooks);
    });
  };

  React.useEffect(() => {
    getUserBookHistory();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: "0",
      }}
    >
      <Stack>
        <Card elevation={4}>
          <h1>History</h1>
        </Card>

        {allBorrowedBooks.map((borrowBook, index) => {
          console.log(borrowBook);
          return (
            <Card
              key={borrowBook.index}
              elevation={4}
              style={{
                margin: "10px",
                paddingLeft: "",
              }}
            >
              <Grid container>
                <Grid item>
                  <Box p={2}>
                    <img
                      src={borrowBook.image}
                      style={{
                        height: "150px",
                        width: "150px",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item p={2} width={300}>
                  <Box>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <Tooltip title={borrowBook.author} placement="top-start">
                        <span
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            width: "180px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {borrowBook.author}
                        </span>
                      </Tooltip>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                      component="div"
                    >
                      <Tooltip placement="bottom-start">
                        <Typography>{borrowBook.title}</Typography>
                      </Tooltip>
                    </Typography>
                  </Box>
                  <Box>{borrowBook.description}</Box>
                  <Box pt={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={borrowBook.rating}
                      precision={0.1}
                      readOnly
                    />
                  </Box>
                  <Box pt={1}>
                    <Chip
                      label={borrowBook.genre}
                      style={{
                        backgroundColor: "#D61355",
                        color: "white",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item pr={2}>
                  <Box pt={2} pl={2}>
                    <Typography sx={{ fontWeight: "600" }} component="div">
                      <Typography>Issued Date</Typography>
                    </Typography>
                  </Box>
                  <Box pt={2} pl={2}>
                    <Typography
                      sx={{ fontWeight: "500", color: "green" }}
                      component="div"
                    >
                      {new Date(borrowBook.issue_date).toLocaleString('en-US', options)}
                    </Typography>
                  </Box>
                  <Box pt={2} pl={2}>
                    <Typography sx={{ fontWeight: "600" }} component="div">
                      <Typography>Returned Date</Typography>
                    </Typography>
                  </Box>
                  <Box pt={2} pl={2}>
                    <Typography
                      sx={{ fontWeight: "500", color: "green" }}
                      component="div"
                    >
                      {borrowBook.returnDate == null ? (
                        <Typography
                          style={{
                            color: "red",
                          }}
                        >
                          Not Returned
                        </Typography>
                      ) : (
                        new Date(borrowBook.returnDate).toLocaleString(
                          "en-US",
                          options
                        )
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          );
        })}
      </Stack>
    </div>
  );
}
