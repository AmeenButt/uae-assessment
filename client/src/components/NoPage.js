import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: 800, fontSize: { xs: "4rem", sm: "6rem" } }}
            gutterBottom
          >
            404
          </Typography>

          <Typography variant="h5" gutterBottom>
            Page Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
