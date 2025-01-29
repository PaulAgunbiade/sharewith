import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type LoaderProps = {
  type?: "white" | "color";
};

export function Loader({type = "color"}: LoaderProps) {
  const boxStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const loaderStyles = type === "color" ? {color: "#ff7073"} : {color: "#ffff"};

  return (
    <Box id="Loader" sx={boxStyles}>
      <CircularProgress sx={loaderStyles} size={80} />
    </Box>
  );
}
