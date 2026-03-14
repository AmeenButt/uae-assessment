import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await new Promise((r) => setTimeout(r, 800));

      if (!values.name.trim()) {
        throw new Error("Name is required.");
      }

      if (!values.email.includes("@")) {
        throw new Error("Enter a valid email address.");
      }

      if (values.password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // Success: call API / navigate
      console.log("Signup successful:", values);
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.");
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
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            position: "relative",
          }}
        >

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
                <PersonAdd />
              </Box>

              <Box>
                <Typography variant="h5" fontWeight={800}>
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign up for admin panel
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
                  label="Full Name"
                  value={values.name}
                  onChange={onChange("name")}
                  fullWidth
                  required
                />

                <TextField
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={onChange("email")}
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={onChange("password")}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={onChange("confirmPassword")}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  sx={{ borderRadius: 2.5, py: 1.2, fontWeight: 800 }}
                >
                  {submitting ? "Creating Account..." : "Sign Up"}
                </Button>

                <Divider />

                <Typography variant="body2" align="center" color="text.secondary">
                  Already have an account?{" "}
                  <Link to="/login" underline="hover" fontWeight={700}>
                    Sign in
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}