
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "../App.css";
import { protectedRoutes } from "../config/routes";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
const Redirect = ({ element }) => {
  const token  = localStorage.getItem('token')
  return !token ? <Navigate to={`/auth/login`} /> 
    : element;
};
export default function Default() {
    return (
        <div
            style={{
                backgroundColor: "#FCFBFB",
                height: "100vh",
                display:'flex'
            }}
        >
            <Sidebar />
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                flexGrow:'1',
                overflowY:'auto'
            }}>
                <Topbar />
                <div>
                    <Routes>
                        {protectedRoutes?.map((route, index) => (
                            <Route
                                key={index}
                                {...route}
                                element={<Redirect {...route} />}
                            />
                        ))}
                    </Routes>
                </div>
            </Box>
        </div>
    );
}
