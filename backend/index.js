// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();



// const app = express();

// const mongoUri = process.env.MONGO_URI;

// mongoose.connect(mongoUri)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: ["http://localhost:5173" , "https://noteshub4u.vercel.app/"], credentials: true }));

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Import your routers
// import authRouter from "./routes/auth.route.js";
// import noteRouter from "./routes/note.route.js";
// app.get('/', (req, res) => {
//   res.json({ message: "Backend is running!" });
// });

// app.use("/api/auth", authRouter);
// app.use("/api/note", noteRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use(cookieParser());

// Allowed origins without trailing slash
const allowedOrigins = [
  "http://localhost:5173",
  "https://noteshub4u.vercel.app"
];

// CORS setup with dynamic origin check
app.use(cors({
  origin: function(origin, callback) {
    // allow requests like curl or postman with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

const PORT = process.env.PORT || 3000;

// Test route to check backend status
app.get('/', (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Import your routers
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import authRouter from "../routes/auth.route.js";
// import noteRouter from "../routes/note.route.js";

// // Load env vars
// dotenv.config();

// const app = express();
// const mongoUri = process.env.MONGO_URI;

// // Mongo connection only once
// if (!mongoose.connection.readyState) {
//   mongoose.connect(mongoUri)
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch((err) => console.error("❌ MongoDB connection error:", err));
// }

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
//   credentials: true
// }));
// app.get('/', (req, res) => {
//   res.json({ message: "Backend is running!" });
// });

// app.use("/api/auth", authRouter);
// app.use("/api/note", noteRouter);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // 👇 Export the handler for Vercel serverless
// export default app;
