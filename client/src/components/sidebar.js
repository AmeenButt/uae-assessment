import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { createUseStyles } from "react-jss";
import { Link, useLocation } from "react-router-dom";
import DashboardLogoImage from "../resources/dashboardLogo.png";
import { AppContext } from "../context/appContext";

const useStyles = createUseStyles({
  "@keyframes showAnimationExSmall": {
    "0%": { width: "0%" },
    "100%": { width: "50%" },
  },
  "@keyframes hideAnimationExSmall": {
    "0%": { width: "50%" },
    "100%": { width: "0%" },
  },
  "@keyframes showAnimationSmall": {
    "0%": { width: "0%" },
    "100%": { width: "35%" },
  },
  "@keyframes hideAnimationSmall": {
    "0%": { width: "35%" },
    "100%": { width: "0%" },
  },
  "@keyframes showAnimation": {
    "0%": { width: "0%" },
    "100%": { width: "15%" },
  },
  "@keyframes hideAnimation": {
    "0%": { width: "15%" },
    "100%": { width: "0%" },
  },

  sidebar: {
    position: "absolute",
    height: "100%",
    width: "15%",
    display: "block",
    transition: "width 0.5s ease",
    borderRight: "1px solid #00000012",
    zIndex: 12,

    "@media (max-width: 500px)": {
      animation: ({ showSidebar }) =>
        showSidebar
          ? "$showAnimationExSmall 0.5s forwards"
          : "$hideAnimationExSmall 0.5s forwards",
    },

    "@media (min-width: 501px) and (max-width: 900px)": {
      animation: ({ showSidebar }) =>
        showSidebar
          ? "$showAnimationSmall 0.5s forwards"
          : "$hideAnimationSmall 0.5s forwards",
    },

    "@media (min-width: 901px)": {
      position: "relative",
      animation: ({ showSidebar }) =>
        showSidebar
          ? "$showAnimation 0.5s forwards"
          : "$hideAnimation 0.5s forwards",
    },
  },

  header: {
    background: "linear-gradient(to left, #A659AC, #061745)",
    height: "65px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  headerContent: {
    position: "relative",
    paddingTop: "16px",
    paddingLeft: "20px",
    display: "flex",
    alignItems: "center",
    justifyItems: "start",
  },

  logo: {
    height: "32px",
    width: "auto",
  },

  headerTitle: {
    fontSize: "20px",
    fontWeight: 400,
    marginLeft: "10px",
    color: "#fff",
  },

  body: {
    backgroundColor: "#fff",
    color: "#000",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "auto",
  },

  nav: {
    flex: 1,
    padding: "16px 8px",
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    marginTop: "8px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#000",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },

  navText: {
    paddingLeft: "12px",
    color: "#000",
    fontSize: "16px",
    fontWeight: 400,
  },

  activeNavText: {
    color: "#45C183",
  },
});

export default function Sidebar() {
  const location = useLocation();
  const { showSidebar } = useContext(AppContext);
  const classes = useStyles({ showSidebar });

  const isJobsActive = location.pathname === "/admin/";

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.header}>
        <Box className={classes.headerContent}>
          <img
            src={DashboardLogoImage}
            alt="Ucon"
            className={classes.logo}
          />
          <Typography className={classes.headerTitle}>
            Assessment
          </Typography>
        </Box>
      </Box>

      <Box className={classes.body}>
        <Box component="nav" className={classes.nav}>
          <Link to="/admin/" className={classes.navLink}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.125 15.625H7.8125C8.2269 15.625 8.62433 15.7896 8.91735 16.0826C9.21038 16.3757 9.375 16.7731 9.375 17.1875V21.875C9.375 22.2894 9.21038 22.6868 8.91735 22.9799C8.62433 23.2729 8.2269 23.4375 7.8125 23.4375H3.125C2.7106 23.4375 2.31317 23.2729 2.02015 22.9799C1.72712 22.6868 1.5625 22.2894 1.5625 21.875V17.1875C1.5625 16.7731 1.72712 16.3757 2.02015 16.0826C2.31317 15.7896 2.7106 15.625 3.125 15.625ZM17.1875 1.5625H21.875C22.2894 1.5625 22.6868 1.72712 22.9799 2.02015C23.2729 2.31317 23.4375 2.7106 23.4375 3.125V7.8125C23.4375 8.2269 23.2729 8.62433 22.9799 8.91735C22.6868 9.21038 22.2894 9.375 21.875 9.375H17.1875C16.7731 9.375 16.3757 9.21038 16.0826 8.91735C15.7896 8.62433 15.625 8.2269 15.625 7.8125V3.125C15.625 2.7106 15.7896 2.31317 16.0826 2.02015C16.3757 1.72712 16.7731 1.5625 17.1875 1.5625ZM17.1875 15.625C16.7731 15.625 16.3757 15.7896 16.0826 16.0826C15.7896 16.3757 15.625 16.7731 15.625 17.1875V21.875C15.625 22.2894 15.7896 22.6868 16.0826 22.9799C16.3757 23.2729 16.7731 23.4375 17.1875 23.4375H21.875C22.2894 23.4375 22.6868 23.2729 22.9799 22.9799C23.2729 22.6868 23.4375 22.2894 23.4375 21.875V17.1875C23.4375 16.7731 23.2729 16.3757 22.9799 16.0826C22.6868 15.7896 22.2894 15.625 21.875 15.625H17.1875ZM17.1875 0C16.3587 0 15.5638 0.32924 14.9778 0.915291C14.3917 1.50134 14.0625 2.2962 14.0625 3.125V7.8125C14.0625 8.6413 14.3917 9.43616 14.9778 10.0222C15.5638 10.6083 16.3587 10.9375 17.1875 10.9375H21.875C22.7038 10.9375 23.4987 10.6083 24.0847 10.0222C24.6708 9.43616 25 8.6413 25 7.8125V3.125C25 2.2962 24.6708 1.50134 24.0847 0.915291C23.4987 0.32924 22.7038 0 21.875 0L17.1875 0ZM3.125 14.0625C2.2962 14.0625 1.50134 14.3917 0.915291 14.9778C0.32924 15.5638 0 16.3587 0 17.1875L0 21.875C0 22.7038 0.32924 23.4987 0.915291 24.0847C1.50134 24.6708 2.2962 25 3.125 25H7.8125C8.6413 25 9.43616 24.6708 10.0222 24.0847C10.6083 23.4987 10.9375 22.7038 10.9375 21.875V17.1875C10.9375 16.3587 10.6083 15.5638 10.0222 14.9778C9.43616 14.3917 8.6413 14.0625 7.8125 14.0625H3.125ZM14.0625 17.1875C14.0625 16.3587 14.3917 15.5638 14.9778 14.9778C15.5638 14.3917 16.3587 14.0625 17.1875 14.0625H21.875C22.7038 14.0625 23.4987 14.3917 24.0847 14.9778C24.6708 15.5638 25 16.3587 25 17.1875V21.875C25 22.7038 24.6708 23.4987 24.0847 24.0847C23.4987 24.6708 22.7038 25 21.875 25H17.1875C16.3587 25 15.5638 24.6708 14.9778 24.0847C14.3917 23.4987 14.0625 22.7038 14.0625 21.875V17.1875ZM0 3.125C0 2.2962 0.32924 1.50134 0.915291 0.915291C1.50134 0.32924 2.2962 0 3.125 0L7.8125 0C8.6413 0 9.43616 0.32924 10.0222 0.915291C10.6083 1.50134 10.9375 2.2962 10.9375 3.125V7.8125C10.9375 8.6413 10.6083 9.43616 10.0222 10.0222C9.43616 10.6083 8.6413 10.9375 7.8125 10.9375H3.125C2.2962 10.9375 1.50134 10.6083 0.915291 10.0222C0.32924 9.43616 0 8.6413 0 7.8125V3.125ZM8.36563 4.45938C8.43826 4.38674 8.49588 4.3005 8.53519 4.2056C8.5745 4.11069 8.59474 4.00898 8.59474 3.90625C8.59474 3.80353 8.5745 3.70181 8.53519 3.6069C8.49588 3.512 8.43826 3.42576 8.36563 3.35312C8.29299 3.28049 8.20675 3.22287 8.11185 3.18356C8.01694 3.14425 7.91523 3.12401 7.8125 3.12401C7.70977 3.12401 7.60806 3.14425 7.51315 3.18356C7.41825 3.22287 7.33201 3.28049 7.25937 3.35312L4.6875 5.92656L3.67813 4.91562C3.60549 4.84299 3.51925 4.78537 3.42435 4.74606C3.32944 4.70675 3.22772 4.68651 3.125 4.68651C3.02228 4.68651 2.92056 4.70675 2.82565 4.74606C2.73075 4.78537 2.64451 4.84299 2.57188 4.91562C2.49924 4.98826 2.44162 5.0745 2.40231 5.1694C2.363 5.26431 2.34276 5.36602 2.34276 5.46875C2.34276 5.57148 2.363 5.67319 2.40231 5.7681C2.44162 5.863 2.49924 5.94924 2.57188 6.02188L4.13437 7.58438C4.20695 7.65713 4.29316 7.71485 4.38807 7.75424C4.48299 7.79362 4.58474 7.8139 4.6875 7.8139C4.79026 7.8139 4.89201 7.79362 4.98693 7.75424C5.08184 7.71485 5.16805 7.65713 5.24063 7.58438L8.36563 4.45938Z"
                fill={isJobsActive ? "#45C183" : "black"}
              />
            </svg>

            <Typography
              className={`${classes.navText} ${
                isJobsActive ? classes.activeNavText : ""
              }`}
            >
              Jobs
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}