import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'admin' } // ✅ ADD THIS LINE
  },
  { timestamps: true }
);

export default mongoose.model('Admin', AdminSchema);
