import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/paymentRoutes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS setup
app.use(cors({
  origin: [
    "https://project-three-beta-njyppznuea.vercel.app", "http://localhost:5173"
  ],
  credentials: true, // fixed spelling
}));

// ✅ Middleware
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Hello Alok, Backend is live and connected");
});

// ✅ Ensure uploads folder exists (TEMP on Vercel)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Serve static uploads
app.use('/uploads', express.static(uploadsDir));

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Server error. Please try again later.' });
});

const PORT = process.env.PORT || 5000;

// ✅ Local run
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

// ✅ Export for Vercel serverless
export default app;
