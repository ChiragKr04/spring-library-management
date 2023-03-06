import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertStatus({ response, responseMethod }) {
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
    // console.log("handle bottom");
  };

  const handleCloseAlert = (event, reason) => {
    //console.log("close");
    responseMethod("");
    if (reason === "clickaway") {
      return;
    }
    response = "";
    setOpenAlert(false);
  };
  React.useEffect(() => {
    //console.log("useEffect" + response);
    if (response) {
      //console.log("alert: " + response.message);

      handleClickAlert();
    }
  }, [response]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={response.message ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {response.message ? response.message : response.error}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
