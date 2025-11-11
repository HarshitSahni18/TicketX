import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth";
import otpRouter from "./routes/otp";
import { authenticateJWT } from "./middlewares/authJWT";
import { validateStats } from "./middlewares/authStats";
import ticketRouter from "./routes/ticket";
import queryRouter from "./routes/query";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
  })
);

app.use("/auth", AuthRouter);
app.use("/otp", authenticateJWT, validateStats, otpRouter);
app.use("/ticket", authenticateJWT, validateStats, ticketRouter);
app.use("/query", queryRouter);

app.get("/health-check", (req, res) => {
  res.status(200).json({ message: "Yeah, I'm Alive!!" });
});

const mongodb_uri = process.env.MONGODB_URI;

if (!mongodb_uri) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1);
} else {
  // Force TLS 1.2+ to avoid SSL errors
  (require("https") as any).globalAgent.options.minVersion = "TLSv1.2";

  mongoose
    .connect(mongodb_uri, {
      dbName: "ticketPortal", // your DB name
      
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully");

      const PORT: number = parseInt(process.env.PORT || "3000", 10);
      app.listen(PORT, () => {
        console.log(`🚀 Server listening on port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ MongoDB connection error:", error);
      process.exit(1); // Exit if DB connection fails
    });
}
