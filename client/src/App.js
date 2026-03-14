import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import AppState from "./context/appContext";
import Alert from "./features/alert";
import Admin from "./layouts/admin"
import Auth from "./layouts/auth"
import AuthRedirect from "./components/protectedAuthRedirect";
import ProtectedRoute from "./components/protectedAuthRedirect";
import PublicAuthRoute from "./components/publicAuthRedirect";
const Redirect = ({ element }) => {
  const token  = localStorage.getItem('token')
  return !token ? <Navigate to={`/auth/login`} /> 
    : element;
};
function App() {
  return (
    <AppState>
      <Alert />
      <Routes>
        <Route path={`/admin/*`} element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path={`/auth/*`} element={<PublicAuthRoute><Auth /></PublicAuthRoute>} />
        <Route path="*" element={<Navigate to='/auth/login' replace />} />
      </Routes>
    </AppState>
  );
}

export default App;
