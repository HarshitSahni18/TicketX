import React from "react";
import "./hero.css";
import hero from "../../assets/hero.png";
import SignUp from "../signUp/SignUp";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../modalProvider/Modalprovider";
import Otp from "../otp/Otp";

export default function Hero() {
  const { openSignupModal, isAuthenticated, user } = useModal();
  const navigate = useNavigate();
  const handleClickServices = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  const viewRequests = () => {
    navigate("/admin/requests");
  };
  return (
    <section id="hero">
      <div className="container1">
        <div className="hero-heading">
          TICKET <br></br>PORTAL
        </div>
        <div className="center_class">
          <div className="hero-details">
            Unleash the Power of Collaboration and Fuel Your Entrepreneurial
            Journey
          </div>
        </div>
        <SignUp />
        <Otp notsignin={true}></Otp>

        {!isAuthenticated && (
          <div className="center_class">
            <div
              className="hero-button center"
              text="REGISTER NOW"
              onClick={openSignupModal}
            >
              Register Now
            </div>
          </div>
        )}
        {isAuthenticated && user.role === "client" && (
          <>
            <div className="center_class">
              <div className="hero-button" onClick={handleClickServices}>
                RAISE TICKETS
              </div>
            </div>
          </>
        )}
        {isAuthenticated && user.ticketResolved && (
          <>
            <div className="center_class">
              <div className="hero-button" onClick={viewRequests}>
                VIEW TICKETS
              </div>
            </div>
          </>
        )}
      </div>
      <div className="image-container">
        <img className="hero-image " src={hero} alt="hero"></img>
      </div>
    </section>
  );
}
