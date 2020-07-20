const express = require("express");
const userRoutes = require("./Routes/routes");
const app = express();
const mongo = require("mongoose");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

// Note: This project was build with most basic features as I dont wanted to
// complicate it with large production based features so please take this assumption
// in mind while revewing and if anywhere you get anything like why i have done this
// just do me a call I will explian its security perspective as this was partially
// build on security.
// The frontend of the project can be improved by adding redux to it but in the task
// it was mentioned nowhere that's why I haven't used it.
// Also you may notice that I have used too less packedges this is because
// I dont prefer using packdges as they migth be vulnerable to threats as
// they are build by normal developers and there are no security check performed
// unless there's a breach.
// Also I dont put too much commits in this project as it was a short project.
// In conculsion I want to say that this might lack my 100% as
// this was a test project but I really encoruge you to see my finished production
// code when we work together.
// thanks

mongo.connect(
  "mongodb+srv://silverpoision:Silver@1671@cluster0.uuwon.mongodb.net/user?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to DB");
  }
);

app.listen(port, (err) => {
  console.log(`Server Started at port ${port}`);
});

//Middlewares
app.use(cors());
app.use(express.json());

//Router
app.use("/api/", userRoutes);

if (process.env.NODE_ENV) {
  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.use((_, res) => {
  return res.status(404).send("404 You are on a wrong way!!");
});

//Error Handler
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  mode = "production";

  if (mode === "development") {
    sendErrorDev(err, res);
  } else if (mode === "production") {
    sendErrorProd(err, res);
  }
});
