const express = require("express");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();
app.use(express.json());

app.use("/api", users);
app.use("/api", auth);

app.use(async (err, req, res, next) => {
  const Error = await err;
  console.log(Error.message);
  res.status(500).json({ success: false, message: "Internal Server Error !" });
});

module.exports = app;
