import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { RestApiService } from "../util/RestApiService";
import { ApiConstants } from "../util/ApiConstants";

export default function IconButtons({ Request, Reload }) {
  const Approve = async () => {
    console.log(Request.Request);
    await RestApiService.post(
      ApiConstants.approvedRequest,
      {
        Authorization: "any-auth-token",
      },
      Request
    ).then((result) => {
      console.log(result.data);
    });
    Reload();
  };
  const Disapprove = async () => {
    console.log(Request);
    await RestApiService.post(
      ApiConstants.disapprovedRequest,
      {
        Authorization: "any-auth-token",
      },
      Request
    ).then((result) => {
      console.log(result.data);
    });
    Reload();
  };
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="done" onClick={Approve}>
        <DoneIcon style={{ color: "green" }} />
      </IconButton>
      <IconButton aria-label="reject" onClick={Disapprove}>
        <CancelIcon style={{ color: "red" }} />
      </IconButton>
    </Stack>
  );
}
