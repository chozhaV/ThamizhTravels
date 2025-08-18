// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist"))); // serve frontend build

// ✅ Enable CORS (allow both local + deployed frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      process.env.FRONTEND_URL, // deployed frontend (e.g., Netlify/Vercel URL)
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const PORT = process.env.PORT || 5000;

// ✅ Twilio Client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ API: Send OTP
app.post("/send-otp", async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    // Ensure phone is in E.164 format
    if (!phone.startsWith("+")) {
      phone = "+91" + phone; // default India country code
    }

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: phone, channel: "sms" });

    res.json({
      success: true,
      message: "OTP sent successfully",
      sid: verification.sid,
    });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: err.message,
    });
  }
});

// ✅ API: Verify OTP
app.post("/verify-otp", async (req, res) => {
  try {
    let { phone, code } = req.body;

    if (!phone || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Phone and OTP are required" });
    }

    if (!phone.startsWith("+")) {
      phone = "+91" + phone; // default India country code
    }

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      const token = jwt.sign(
        { phone },
        process.env.JWT_SECRET || "mysecretkey",
        { expiresIn: "1h" }
      );
      res.json({
        success: true,
        userDetails: { phone },
        token,
        message: "OTP verified successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: err.message,
    });
  }
});

// ✅ Serve React frontend (dist/index.html) for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ✅ Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
