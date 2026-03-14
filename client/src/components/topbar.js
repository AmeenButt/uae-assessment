import { Avatar, Box, Card, MenuItem } from "@mui/material";
import { memo, useContext, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import profileImage from "../resources/profile.png";

const useStyles = createUseStyles({
  topBar: {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    borderBottom: "1px solid #e5e7eb",
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 12,
  },

  topBarExpanded: {
    width: "85%",
  },

  topBarCollapsed: {
    width: "100%",
  },

  leftSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  menuWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    // width: "24rem",
  },

  menuButton: {
    border: "none",
    background: "transparent",
    color: "rgba(107, 114, 128, 1)",
    cursor: "pointer",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,

    "&:focus": {
      color: "rgba(55, 65, 81, 1)",
    },
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
    paddingRight: "8px",
  },

  iconItem: {
    marginRight: "12px",
  },

  iconContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mutedIcon: {
    color: "rgba(0,0,0,0.3)",
  },

  badge: {
    height: "11px",
    width: "11px",
    backgroundColor: "#ef4444",
    borderRadius: "9999px",
    position: "absolute",
    top: 0,
    right: 0,
  },

  "@keyframes ping": {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },

  badgePing: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    borderRadius: "9999px",
    backgroundColor: "#99f6e4",
    animation: "$ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  },

  profileWrapper: {
    position: "relative",
    marginRight: "12px",
  },

  avatar: {
    height: "25px !important",
    width: "25px !important",
    position: "relative",
    cursor: "pointer",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  profileMenu: {
    position: "absolute !important",
    top: "120%",
    right: "10%",
    backgroundColor: "#fff !important",
    minWidth: "120px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },

  logoutItem: {
    padding: "10px 20px !important",
  },

  "@media (max-width: 899px)": {
    topBar: {
      width: "100% !important",
    },
  },

  "@media (min-width: 900px)": {
    leftSection: {
      display: "flex",
    },
  },
});

function TopBar() {
  const classes = useStyles();
  const navigator = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setshowSidebar, showSidebar } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.clear();
    navigator("/auth/");
  };

  return (
    <Box
      className={`${classes.topBar} ${
        showSidebar ? classes.topBarExpanded : classes.topBarCollapsed
      }`}
    >
      <Box className={classes.leftSection}>
        <Box className={classes.menuWrapper}>
          <button
            onClick={() => setshowSidebar(!showSidebar)}
            className={classes.menuButton}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </Box>
      </Box>

      <Box className={classes.rightSection}>

        <Box className={classes.profileWrapper}>
          <Avatar
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={classes.avatar}
          >
            <img src={profileImage} alt="Profile" className={classes.avatarImage} />
          </Avatar>

          {showProfileMenu && (
            <Card className={classes.profileMenu}>
              <MenuItem
                className={classes.logoutItem}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default memo(TopBar);