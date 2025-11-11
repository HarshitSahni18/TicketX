import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ticketRaised: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  OTP: {
    type: String,
    required: true,
  },
  OTP_Attempt: {
    type: Number,
    default: 0,
  },
  incorrectAttempt: {
    type: Number,
    default: 0,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  ticketCount: {
    type: Number,
    default: 0,
  },
});

const Users = mongoose.model("User", UserSchema);

export default Users;
