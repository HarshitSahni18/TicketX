import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import Login from "../login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.png";
import { useModal } from "../../modalProvider/Modalprovider";
import Otp from "../otp/Otp";
import SignUp from "../signUp/SignUp";

function NavBar() {
  const {
    openSignupModal,
    openLoginModal,
    isAuthenticated,
    user,
    openotpModal,
  } = useModal();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClickServices = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleClickStories = () => {
    window.open("https://imagineher.org/our-impact", "_blank");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  const handleClickTicketHistory = () => {
    navigate("/ticket-history/requests");
  };

  const handleProfile = () => {
    navigate("/ticket-history");
  };
  const openSignup = () => {
    navigate("/");
    openSignupModal();
  };
  const openOtp = () => {
    navigate("/");
    openotpModal();
  };

  return (
    <>
      <div className="Navbar">
        <div className="navigation web">
          <div>
            <div className="links web" onClick={handleClickHome}>
              Home
            </div>
            <div className="bar web"></div>
          </div>
          <div className="links web" onClick={handleClickServices}>
            Services
          </div>
          {isAuthenticated ? (
            <div className="links web" onClick={handleClickTicketHistory}>
              Ticket History
            </div>
          ) : (
            <div className="links web" onClick={handleClickStories}>
              Impact
            </div>
          )}
        </div>
        <img className="company-logo" src={logo} alt="company-logo" />
        {isAuthenticated ? (
          <>
            <div className="navigation profile-design" onClick={handleProfile}>
              <div className="email">{user.name}</div>
              <img src={profile} alt="profile-pic" className="profile" />
            </div>
          </>
        ) : (
          <>
            <div className="navigation">
              <Login styleName="links" />
              <div className="button" onClick={openSignup}>
                SignUp
              </div>
            </div>
          </>
        )}
        <div
          className="mobile-menu-icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <div className="links" onClick={handleClickHome}>
            Home
          </div>
          <div className="links" onClick={handleClickServices}>
            Services
          </div>
          {isAuthenticated ? (
            <div className="links" onClick={handleClickTicketHistory}>
              Ticket History
            </div>
          ) : (
            <div className="links" onClick={handleClickStories}>
              Impact
            </div>
          )}
          {isAuthenticated ? (
            <>
              <div className="links" onClick={handleProfile}>
                Profile
              </div>
              <Otp notsignin={true} />
              {user && !user.verified && (
                <div className="links" onClick={openOtp}>
                  Verify Email
                </div>
              )}
            </>
          ) : (
            <>
              <div className="links" onClick={openLoginModal}>
                Login
              </div>
              <div className="links" onClick={openSignup}>
                SignUp
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;
