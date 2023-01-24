const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");

// import Routers files
const catRoutes = require("./routes/cats");

//import Middleware functions
const { logger } = require("./middleware");

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

// this applies to all requests at all paths
app.use(logger);

// apply a prefix to every route in imported Routes (userRoutes)
app.use("/cats", catRoutes);

/** Routes go here */

app.get("/", function (req, res) {
  return res.send("Hello World!");
});

// end routes


/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});
// end


module.exports = app;