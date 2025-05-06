const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/feed", require("./routes/feed"));
app.use("/users", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

module.exports = app;
