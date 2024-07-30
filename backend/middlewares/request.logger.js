// middlewares/requestLogger.js
const requestLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
  
    res.on('finish', () => {
      const statusCode = res.statusCode;
      console.log(`[${timestamp}] ${method} request to ${url}: ${statusCode}`);
    });
  
    next();
  };
  module.exports = requestLogger;
  