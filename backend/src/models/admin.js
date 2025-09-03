import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { compare } = bcrypt;
const { Schema, model, models } = mongoose;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AdminSchema.methods.verifyPassword = async function (plain) {
  return compare(plain, this.passwordHash);
};
const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
