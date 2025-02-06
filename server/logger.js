const fs = require("fs");
const path = require("path");
const moment = require("moment");

const logFilePath = path.join(__dirname, "server.log");

const loggerMiddleware = (req, res, next) => {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const logEntry = `[${timestamp}] ${req.method} ${req.url} - ${res.statusCode}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error logging request:", err);
    }
  });

  next(); // Pass control to the next middleware or route handler
};

module.exports = loggerMiddleware;
