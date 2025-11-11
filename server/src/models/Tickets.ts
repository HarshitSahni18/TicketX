import mongoose from "mongoose";

const UserRaised = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const TicketSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateRaised: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Tickets = mongoose.model("Ticket", TicketSchema);

export default Tickets;
