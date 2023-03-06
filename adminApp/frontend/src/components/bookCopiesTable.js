import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ConfirmModal from "./ConfirmModal";

export default function BookCopiesTable({
  copyList,
  userDetail,
  closingModal,
  setResponseOfBookIssueMethod,
}) {
  return (
    <TableContainer component={Paper}>
      <Table /*sx={{ minWidth: 650 }}*/ aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Copy ID</TableCell>
            <TableCell align="right">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {copyList.map((bookCopy) => (
            <TableRow
              key={bookCopy.bookCopyId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" key={bookCopy.id}>
                {bookCopy.bookCopyId}
              </TableCell>
              <TableCell align="right" key={bookCopy.id}>
                <ConfirmModal
                  bookCopy={bookCopy}
                  userDetail={userDetail}
                  closingModal={closingModal}
                  setResponseOfBookIssueMethod={setResponseOfBookIssueMethod}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
