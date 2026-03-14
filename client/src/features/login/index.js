import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

export default function LoginPage() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const { onShowAlert } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onChange = (key) => (e) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!values.email.includes("@") || values.password.length < 6) {
        throw new Error("Enter a valid email and a password (min 6 chars).");
      }
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status !== 200) {
        throw new Error("Login failed. Please check your credentials.");
      }
      localStorage.setItem("token", response.data.token);
      onShowAlert("Login successful!", "success");
      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "background.default",
        backgroundImage: (theme) =>
          `radial-gradient(1200px 600px at 20% 10%, ${theme.palette.primary.main}22, transparent 60%),
           radial-gradient(900px 500px at 80% 30%, ${(theme.palette.secondary?.main || theme.palette.primary.main)}1f, transparent 55%),
           linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Subtle top accent */}
          <Box sx={{ position: "absolute", inset: 0, height: 6, bgcolor: "primary.main" }} />

          <Stack spacing={3} sx={{ pt: 1 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                <LockOutlined />
              </Box>

              <Box>
                <Typography variant="h5" fontWeight={800} lineHeight={1.1}>
                  Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to continue
                </Typography>
              </Box>
            </Stack>

            {error && (
              <Alert severity="error" variant="outlined">
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.2}>
                <TextField
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={onChange("email")}
                  autoComplete="email"
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={onChange("password")}
                  autoComplete="current-password"
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />


                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  sx={{ borderRadius: 2.5, py: 1.2, fontWeight: 800 }}
                >
                  {submitting ? "Signing in..." : "Sign in"}
                </Button>

                {/* <Divider /> */}

                {/* <Typography variant="body2" color="text.secondary" align="center">
                  Don't have an account?{" "}
                  <Link to="/signup" underline="hover" fontWeight={700}>
                    Create one
                  </Link>
                </Typography> */}

              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}