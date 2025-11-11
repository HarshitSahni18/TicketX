import { Request, Response } from "express";
import Users from "../models/Users";
import Admins from "../models/Admins";
import Tickets from "../models/Tickets";
import ticketSchema from "../validation/ticket";

export const getUser = async (req: Request, res: Response) => {
  const user: {
    id: string;
    role: string;
  } = req.body.user;

  try {
    let userData;
    if (user.role === "admin") {
      userData = await Admins.findById(user.id)
        .populate("ticketResolved")
        .populate("ticketInReview");
    } else {
      userData = await Users.findById(user.id).populate("ticketRaised");
      if(userData){
        userData = { ...userData.toObject(), role: "client" };
      }
    }
  
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error while getting user details" });
    console.log(err);
  }
};

export const raiseTicket = async (req: Request, res: Response) => {
  try {
    const isValidTicket = ticketSchema.safeParse(req.body.ticket);

    if (!isValidTicket.success) {
      return res.status(400).json({
        message: isValidTicket.error.issues[0].message,
        error: isValidTicket.error,
      });
    }

    const user: {
      id: string;
      name: string;
      email: string;
      location: string;
      count: number;
    } = req.body.user;

    const ticket = {
      ...isValidTicket.data,
      dateRaised: new Date().toDateString(),
      status: "pending",
      raisedBy: user.id,
    };

    const newTicket = new Tickets(ticket);
    await newTicket.save();

    await Users.updateOne(
      { _id: user.id },
      { $push: { ticketRaised: newTicket.id }, $inc: { ticketCount: 1 } }
    );

    res.status(201).json({ message: "successfully raised ticket" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error while raising Ticket" });
    console.log(err);
  }
};

// admin specific routes
export const getTickets = async (req: Request, res: Response) => {
  const userRole = req.body.user?.role;
  const ticketStatus= req.query.ticketStatus;
  if (!userRole || userRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (
    ticketStatus !== "pending" &&
    ticketStatus !== "inreview" &&
    ticketStatus !== "resolved"
  ) {
    return res.status(400).json({ message: "Invalid ticketStatus" });
  }

  try {
    const tickets = await Tickets.find({ status: ticketStatus }).populate(
      "raisedBy"
    );

    res.json({ tickets });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error while fetching tickets" });
    console.log(err);
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  const user = req.body.user;

  if (!user?.role || user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const ticket: { id: string; status: string } = req.body.ticket;
  if (ticket.status !== "inreview" && ticket.status !== "resolved") {
    return res.status(400).json({ message: "Invalid ticketStatus" });
  }

  try {
    await Tickets.updateOne({ _id: ticket.id }, { status: ticket.status });

    if (ticket.status === "resolved") {
      await Admins.updateOne(
        { _id: user.id },
        {
          $push: { ticketResolved: ticket.id },
          $pull: { ticketInReview: ticket.id },
        }
      );
    } else {
      await Admins.updateOne(
        { _id: user.id },
        {
          $push: { ticketInReview: ticket.id },
        }
      );
    }

    res.status(200).json({ message: "Successfully updated ticket status" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error while ticket status update" });
    console.log(err);
  }
};

export const getRecentTickets = async (req: Request, res: Response) => {
  const userRole = req.body.user?.role;

  if (!userRole || userRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const recentTickets = await Tickets.find().limit(25).populate("raisedBy");

    res.status(200).json({ tickets: recentTickets });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error while fetching recent tickets" });
    console.log(err);
  }
};
