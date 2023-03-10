import { Check, Close, Person } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ApiConstants } from "../util/ApiConstants";
import { RestApiService } from "../util/RestApiService";
import BorrowRequestTable from "../components/BorrowRequestTable";

export default function BorrowRequestPage({ ActiveRequest, Reload }) {
  if (ActiveRequest.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <BorrowRequestTable
        activeRequest={ActiveRequest}
        Reload={Reload}
      ></BorrowRequestTable>
    </div>
  );
}
