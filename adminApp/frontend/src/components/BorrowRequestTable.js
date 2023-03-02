import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import IconButtons from "./IconButton";

export default function BorrowRequestTable({ activeRequest, Reload }) {
  return (
    <TableContainer component={Card}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Book ID</TableCell>
            <TableCell align="right">Copy ID</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeRequest.map((request, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {request.bookTitle}
              </TableCell>
              <TableCell align="right">{request.author}</TableCell>
              <TableCell align="right">{request.bookId}</TableCell>
              <TableCell align="right">{request.copyId}</TableCell>
              <TableCell align="right">{request.userId}</TableCell>
              <TableCell>
                <IconButtons
                  Request={activeRequest[index]}
                  Reload={Reload}
                ></IconButtons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
