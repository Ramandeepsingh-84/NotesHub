// config.js
const config = {
  frontendUrl: "http://localhost:5173",
  // aur backend ke liye bhi config yaha daal sakte ho
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
};

export default config;
