// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Chip,
//   IconButton,
//   Rating,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { Stack } from "@mui/system";
// import React from "react";
// import BorrowButtonModal from "../components/borrowButtonModal";
// import FilterPage from "./FilterPage";

// export default function HomePage({
//   userDetails,
//   bookData,
//   constBookData,
//   setResponseOfBookIssueMethod,
//   changeBookDataOnFilter,
//   setDataOnClearFilter,
// }) {
//   const bookDataCopy = [...bookData];

//   return (
//     <div style={{ textAlign: "center" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           flexWrap: "wrap",
//           paddingLeft: "0",
//         }}
//       >
//         <FilterPage
//           mainBookData={constBookData}
//           bookDataCopy={bookDataCopy}
//           changeBookDataOnFilter={changeBookDataOnFilter}
//           setDataOnClearFilter={setDataOnClearFilter}
//         />
//         {bookData?.map((e, i) => {
//           return (
//             <div key={i} style={{ margin: "15px", display: "flex" }}>
//               <Card
//                 elevation={0}
//                 className="Bookcard"
//                 key={e.id}
//                 style={{ width: "180px" }}
//               >
//                 <CardContent
//                   style={{
//                     paddingBottom: "0px",
//                   }}
//                 >
//                   <img
//                     className="imgBook"
//                     alt={e.title}
//                     src={e.image}
//                     style={{ width: "144px", height: "168px" }}
//                   ></img>
//                   <Typography
//                     sx={{ fontSize: 14 }}
//                     color="text.secondary"
//                     gutterBottom
//                   >
//                     <Tooltip title={e.author} placement="top-start">
//                       <span
//                         style={{
//                           textOverflow: "ellipsis",
//                           overflow: "hidden",
//                           width: "180px",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {e.author}
//                       </span>
//                     </Tooltip>
//                   </Typography>
//                   <Typography sx={{ fontWeight: 640 }} component="div">
//                     <Tooltip placement="bottom-start">
//                       <Typography
//                         style={{
//                           textOverflow: "ellipsis",
//                           overflow: "hidden",
//                           width: "150px",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {e.title}
//                       </Typography>
//                     </Tooltip>
//                   </Typography>
//                   <Rating
//                     name="half-rating-read"
//                     defaultValue={e.rating}
//                     precision={0.1}
//                     readOnly
//                   />
//                   <Chip
//                     label={e.genre}
//                     style={{
//                       // height: "2%",
//                       backgroundColor: "#D61355",
//                       color: "white",
//                     }}
//                   />
//                 </CardContent>
//                 <CardActions style={{ position: "relative" /*bottom: "0%"*/ }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       width: "100%",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <BorrowButtonModal
//                       e={e}
//                       userDetail={userDetails}
//                       setResponseOfBookIssueMethod={
//                         setResponseOfBookIssueMethod
//                       }
//                     />
//                     <Typography
//                       color="text.secondary"
//                       fontSize={12}
//                       style={
//                         e.available ? { color: "green" } : { color: "red" }
//                       }
//                     >
//                       {e.available ? "Available" : "Not Available"}
//                     </Typography>
//                   </div>
//                 </CardActions>
//               </Card>
//             </div>
//           );
//         })}
//       </div>
//       <h1>{bookData.length == 0 ? "No result Found." : ""}</h1>
//     </div>
//   );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
