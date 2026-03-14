import React from "react";
import { Box, Typography } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
    textAlign: "center",
  },

  text: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#6b7280",
  },
});

const EmptyData = ({ data, children }) => {
  const classes = useStyles();

  if (data?.length !== 0) return children;

  return (
    <Box className={classes.container}>
      <Box className={classes.section}>
        <Typography className={classes.text}>
          No Items Found
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyData;