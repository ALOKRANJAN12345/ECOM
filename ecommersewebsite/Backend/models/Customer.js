import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'customer' } // ✅ Add this
  },
  { timestamps: true }
);

export default mongoose.model('Customer', CustomerSchema);
