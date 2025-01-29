import {forwardRef} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useSelector} from "react-redux";
import useToast from "../../hooks/useToast";

export default function ToastMessage() {
  const toast = useSelector((state) => state.toast);
  const toastInstance = useToast();

  const {isOpen, message, type} = toast;

  const handleClose = () => {
    toastInstance.close();
  };

  const theme = createTheme({
    palette: {
      success: {
        main: "rgb(56, 142, 60)",
      },
      error: {
        main: "#ffc8ce",
      },
    },
  });

  const Alert = forwardRef(function Alert(props, ref) {
    return (
      <ThemeProvider theme={theme}>
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />{" "}
      </ThemeProvider>
    );
  });

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{marginBottom: "5%"}}
    >
      <Alert
        onClose={handleClose}
        color={type}
        severity={type}
        sx={{width: "100%"}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
