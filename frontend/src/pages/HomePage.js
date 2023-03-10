import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import BorrowButtonModal from "../components/borrowButtonModal";
import FilterPage from "./FilterPage";

export default function HomePage({
  userDetails,
  bookData,
  constBookData,
  setResponseOfBookIssueMethod,
  changeBookDataOnFilter,
  setDataOnClearFilter,
}) {
  const bookDataCopy = [...bookData];

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: "0",
        }}
      >
        <FilterPage
          mainBookData={constBookData}
          bookDataCopy={bookDataCopy}
          changeBookDataOnFilter={changeBookDataOnFilter}
          setDataOnClearFilter={setDataOnClearFilter}
        />
        {bookData?.map((e, i) => {
          return (
            <div key={i} style={{ margin: "15px", display: "flex" }}>
              <Card
                elevation={0}
                className="Bookcard"
                key={e.id}
                style={{ width: "180px" }}
              >
                <CardContent
                  style={{
                    paddingBottom: "0px",
                  }}
                >
                  <img
                    className="imgBook"
                    alt={e.title}
                    src={e.image}
                    style={{ width: "144px", height: "168px" }}
                  ></img>
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
                  <Typography sx={{ fontWeight: 640 }} component="div">
                    <Tooltip placement="bottom-start">
                      <Typography
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          width: "150px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {e.title}
                      </Typography>
                    </Tooltip>
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    defaultValue={e.rating}
                    precision={0.1}
                    readOnly
                  />
                  <Chip
                    label={e.genre}
                    style={{
                      // height: "2%",
                      backgroundColor: "#D61355",
                      color: "white",
                    }}
                  />
                </CardContent>
                <CardActions style={{ position: "relative" /*bottom: "0%"*/ }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <BorrowButtonModal
                      e={e}
                      userDetail={userDetails}
                      setResponseOfBookIssueMethod={
                        setResponseOfBookIssueMethod
                      }
                    />
                    <Typography
                      color="text.secondary"
                      fontSize={12}
                      style={
                        e.available ? { color: "green" } : { color: "red" }
                      }
                    >
                      {e.available ? "Available" : "Not Available"}
                    </Typography>
                  </div>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      <h1>{bookData.length == 0 ? "No result Found." : ""}</h1>
    </div>
  );
}
