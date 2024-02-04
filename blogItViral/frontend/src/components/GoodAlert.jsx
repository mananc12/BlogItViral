import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const BadAlert = (props) => {
  return (
    <Stack sx={{ width: "26%", position: "absolute", top: "10%" }} spacing={2}>
      <Alert variant="filled" severity="success">
        {props.message}
      </Alert>
    </Stack>
  );
};

export default BadAlert;
