import React, { useState } from "react";
import "./ticket_popup.css";
import Reqbox from "../reqbox/Reqbox";
import { useModal } from "../../modalProvider/Modalprovider";
import Pagenavigation from "../pagenavigation/Pagenavigation";

export default function TicketRequestssection() {
  const { user } = useModal();
  const initialStatus =
    user.role && user.role === "client" ? "pending" : "inreview";
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;
  // Calculate the index range for the currently displayed tickets
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let filteredTickets = [];
  if (user.role && user.role === "client") {
    filteredTickets = user.ticketRaised.filter(
      (ticket) => ticket.status === selectedStatus
    );
  } else if (user.ticketResolved) {
    if (selectedStatus === "inreview") {
      filteredTickets = user.ticketInReview;
    } else if (selectedStatus === "resolved")
      filteredTickets = user.ticketResolved;
  }

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  return (
    <div className="admin_section">
      <div className="heading">
        <div>
          TICKET<br></br>
          <span>HISTORY</span>
        </div>
      </div>
      <div className="req-status admin_status center">
        {user.role && user.role === "client" && (
          <div
            className={`pending ${
              selectedStatus === "pending" ? "status" : ""
            }`}
            onClick={() => handleStatusClick("pending")}
          >
            Pending
          </div>
        )}
        <div
          className={`inreview ${
            selectedStatus === "inreview" ? "status" : ""
          }`}
          onClick={() => handleStatusClick("inreview")}
        >
          Inreview
        </div>
        <div
          className={`resolved ${selectedStatus === "resolved" ? "status" : ""}`}
          onClick={() => handleStatusClick("resolved")}
        >
          Resolved
        </div>
      </div>

      {filteredTickets.length > 0 ? (
        currentTickets.map((ticket,index) => (
          <Reqbox key={index} ticket={ticket} /> // Added a key prop for React
        ))
      ) : (
        <h3 className="center">No {selectedStatus} Tickets</h3>
      )}

      <Pagenavigation
        ticketsPerPage={ticketsPerPage}
        totalTickets={filteredTickets.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}
