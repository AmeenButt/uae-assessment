
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function Default(props) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detects small screens
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md")); // Detects small screens
    return (
        <AnimatePresence>
            {props.open && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    props.setOpen(false);
                }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: isSmallScreen || isMediumScreen ? "90%" : props.width || "33%",
                        maxHeight: "90%",
                        overflow: "auto",
                        backgroundColor: "white",
                        padding: "30px 30px",
                        borderRadius: "15px",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                    }}
                >
                    <center>
                        <Typography variant="h6" style={{marginBottom:'20px'}}>{props.header}</Typography>
                    </center>
                    {props.children}
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    );
}
