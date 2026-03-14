import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import ErrorIcon from "@mui/icons-material/Error";
import FolderIcon from "@mui/icons-material/Folder";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
    Box,
    Collapse,
    IconButton,
    Alert as MuiAlert,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

const Alert = () => {
  const { alertType: type, showAlert: show, alertBody: body, dismissAlert } = useContext(AppContext);
    
  const getSeverity = () => {
    switch (type) {
      case "primary":
      case "secondary":
      case "dark":
        return "info";
      case "warning":
        return "warning";
      case "success":
        return "success";
      case "danger":
        return "error";
      case "info":
      default:
        return "info";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "primary":
        return <StarIcon fontSize="inherit" />;
      case "secondary":
        return <CollectionsIcon fontSize="inherit" />;
      case "warning":
        return <WarningAmberIcon fontSize="inherit" />;
      case "info":
        return <InfoIcon fontSize="inherit" />;
      case "dark":
        return <FolderIcon fontSize="inherit" />;
      case "success":
        return <CheckCircleIcon fontSize="inherit" />;
      case "danger":
        return <ErrorIcon fontSize="inherit" />;
      default:
        return <InfoIcon fontSize="inherit" />;
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: { xs: "90%", sm: "auto" },
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <Collapse in={show}>
        <MuiAlert
          severity={getSeverity()}
          icon={getIcon()}
          sx={{
            pointerEvents: "all",
            alignItems: "center",
            boxShadow: 4,
            borderRadius: 2,
            minWidth: 300,
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={dismissAlert}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {body}
        </MuiAlert>
      </Collapse>
    </Box>
  );
};

export default Alert;