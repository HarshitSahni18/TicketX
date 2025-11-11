import React, { useState } from "react";
import "./profile.css";
import { useModal } from "../../modalProvider/Modalprovider";
import Otp from "../otp/Otp";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setLogout, openotpModal } = useModal();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ user });

  const logout = () => {
    setLogout();
    localStorage.clear();
    navigate("/");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value !== "" ? value : user[name],
    });
  };

  const handleProfileChanges = async () => {
    const authToken = localStorage.getItem("authorization");

    try {
      let bodyData = {
        name: editedUser.name,
        email: editedUser.email,
        location: document.querySelector("select").value,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/profile-update`,
        {
          method: "POST",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        console.error(`Failed to update profile changes: ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating profile changes:", err);
    }

    setIsEditing(false);
    setEditedUser(user);
  };

  const handlesendOTP = async () => {
    const authToken = localStorage.getItem("authorization");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/otp/resend`, {
        method: "PATCH",
        headers: {
          Authorization: authToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        console.err(`Failed to send OTP: ${data.message}`);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };
  const handleVerify = () => {
    if (!user.verified) {
      navigate("/");
      openotpModal();
      handlesendOTP();
    }
  };

  return (
    <>
      <div className="profile_page">
        <div className="container-profile">
          <div className="profile-details">
            <div className="profile-img"></div>
            {isEditing ? (
              <>
                <div>
                  <div className="name">
                    <div className="title">Name</div>
                    <input
                      className="name-box"
                      placeholder={user.name}
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="name">
                    <div className="title">Email</div>
                    <input
                      className="name-box"
                      placeholder={user.email}
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                    ></input>
                  </div>

                  <div className="name">
                    <div className="title">Location</div>
                    <select
                      className="name-box"
                      name="location"
                      placeholder={user.location}
                      value={editedUser.location}
                      onChange={handleInputChange}
                    >
                      <option value="Northern Region">Northern Region</option>
                      <option value="Eastern Region">Eastern Region</option>
                      <option value="Western Region">Western Region</option>
                      <option value="South Western Region">
                        South Western Region
                      </option>
                      <option value="West Nile">West Nile</option>
                      <option value="Central Region">Central Region</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="profile-cont">
                  <div className="name">
                    <div className="title">Name</div>
                    <div className="name-box">{user.name}</div>
                  </div>
                  <div className="name">
                    <div className="title">Email</div>
                    <div className="name-box">{user.email}</div>
                  </div>

                  <div className="name">
                    <div className="title">Location</div>
                    <div className="name-box">{user.location}</div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="buttons">
            {isEditing ? (
              <>
                <div
                  className="hero-button edit"
                  onClick={handleProfileChanges}
                >
                  Save Changes
                </div>
              </>
            ) : (
              <>
                <div
                  className="hero-button edit edit1"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </div>
              </>
            )}
            {user && !user.verified && (
              <div className="hero-button edit" onClick={handleVerify}>
                Verify
              </div>
            )}

            <div className="hero-button edit" onClick={logout}>
              LogOut
            </div>
          </div>
        </div>
        {/* <div className="req-popup side" onClick={handleClickTicketHistory}>
          Ticket History
        </div> */}
      </div>
    </>
  );
}
