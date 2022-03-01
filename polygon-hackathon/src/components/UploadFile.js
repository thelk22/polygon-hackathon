import * as React from "react";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";

const Input = styled("input")({
  display: "none",
});

// This component contains an upload button, and a transfer button
function UploadFile() {
  const handleClick = (event) => {};

  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button variant="contained" component="span" onClick={handleClick}>
        <FileUploadIcon fontSize="large" />
      </Button>
    </label>
  );
}

export default UploadFile;
