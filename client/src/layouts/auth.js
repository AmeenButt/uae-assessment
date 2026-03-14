import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/login";
import SignupPage from "../features/signup";

export default function Default() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to='/auth/login' replace />} />
      </Routes>
    </>
  );
}
