import Modal from "react-modal";
import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useModal } from "../../modalProvider/Modalprovider";
import "./viewReq.css";

import profile from "../../assets/profile.png";

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContent = styled.div`
  width: 700px;

  flex-shrink: 0;
  border-radius: 16.477px;
  background: #fff;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 8px;
  display: block;
  @media (max-width:690px) {
    width:280px;
    min-height:430px;
    padding: 5px;
}
`;

export default function ViewReq(props) {
  const ticket=props.ticket
  const {user,isAuthenticated} = useModal();
  const authToken = localStorage.getItem("authorization");
  const modalRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
 
  const updateStatus = async (newstatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/ticket/update`,
        {
          method: "PUT",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            ticket: { id: ticket._id, status: newstatus },
          }),
        }
      );
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message)
        window.location.reload()
        
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to update ticket status: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error updating ticket status:", err);
    }
  };
  

  



  return (
    <>
      <div className="container2-req" onClick={openModal}>
        <div className="view-button">View</div>
      </div>

      <CustomModal
        isOpen={modalIsOpen}
        contentLabel="View Req Modal"
        ariaHideApp={false}
      >
        <ModalContent ref={modalRef}>
          <div className="user-details">
            <div className="profile-pic">
              <img src={profile} alt="profilepic" className="profile pic" />
              <div className="user-deatils">
                {user && user.role==="client" ?<>
                    <div className="name-admin padding">Name : {user.name}</div>
                    <div className="number padding">Email : {user.email} </div>
                </>:<>
                    <div className="name-admin padding">Name : {ticket.raisedBy.name}</div>
                    <div className="number padding">Email : {ticket.raisedBy.email} </div>
                </>}
                <div className="number padding">Title : {ticket.title} </div>
              </div>
            </div>
            <div className="date">
              Raised on : <br></br> <span>{ticket.dateRaised}</span>
            </div>
          </div>
          <div className="text">{ticket.message}</div>
            <div className="margin">Status : {ticket.status}</div>
            {isAuthenticated && user.ticketResolved && ticket.status==="pending" &&
          <div className="checkbox">
            <input type="checkbox" onClick={() => updateStatus("inreview")}/>
            <div>Started Review</div>
          </div>}
          {isAuthenticated && user.ticketResolved && ticket.status!=="resolved" &&
          <div className="center">

          <div className="button login-button request-button reposition
          " onClick={() => updateStatus("resolved")}>Mark as Resolved
          </div>
          </div>}

          <div className="new-account request-back center" onClick={closeModal}>
            Go Back
          </div>
        </ModalContent>
      </CustomModal>
    </>
  );
}
