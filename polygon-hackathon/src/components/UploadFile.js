import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// This component contains an upload button, and a transfer button
function UploadFile() {
  return (
    <IconButton aria-label="upload">
      <FileUploadIcon />
    </IconButton>
  );
}

export default UploadFile;
