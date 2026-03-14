require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then(async () => {
        console.log("Connected to Mongo instance");
    })
    .catch((error) => {
        console.error("Error connecting to Mongo instance", error);
    });
// mongoose.set('debug', true);
const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data: http://localhost:5000; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests"
    );
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});
app.use(express.json());
app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/jobs", require("./routes/jobRoute"));
app.listen(port, console.log(`Listening on port:${port}`));