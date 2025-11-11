import Modal from "react-modal";
import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import "./signUp.css";
import { useModal } from "../../modalProvider/Modalprovider";

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
  width: 500px;
  z-index: 1000;
  position: fixed;
  flex-shrink: 0;
  border-radius: 16.477px;
  background: #fff;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 8px;
  display: block;
  @media (max-width: 690px) {
    width: 260px;
    height: 470px;
    padding: 5px;
  }
`;
export default function SignUp() {
  const { signupModalIsOpen, closeSignupModal, openLoginModal, openotpModal } =
    useModal();
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    Confirmpassword: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const determineUserRole = (email) => {
    if (email.endsWith("@i-her.org")) {
      return "admin";
    } else {
      return "user";
    }
  };
  const handleSubmit = async () => {
    if (formData.password !== formData.Confirmpassword) {
      alert("Password didn't match");
      return;
    }
    const role = determineUserRole(formData.email);

    try {
      console.log(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signup?role=${role}`)
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signup?role=${role}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            location: document.querySelector("select").value,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        localStorage.setItem("authorization", `Bearer ${data.authToken}`);
        alert(data.message);
        closeSignupModal();
        openotpModal();
      } else {
        console.log(data);
        throw new Error(data.message);
      }
    } catch (err) {
      console.log("Error during signup");
      alert(err);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      Confirmpassword: "",
    });
  };

  useEffect(() => {
    const handleModalClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeSignupModal();
      }
    };
    document.addEventListener("mousedown", handleModalClick);
    return () => {
      document.removeEventListener("mousedown", handleModalClick);
    };
  }, []);

  const handleLogin = () => {
    closeSignupModal();
    openLoginModal();
  };
  return (
    <div>
      {/* <div className={styleName} onClick={openSignupModal}>
        {text ? text : "SignUp"}
      </div> */}

      <CustomModal
        isOpen={signupModalIsOpen}
        onRequestClose={closeSignupModal}
        contentLabel="SignUp Modal"
        ariaHideApp={false}
      >
        <ModalContent ref={modalRef}>
          <div className="form-heading-signUp">SignUp</div>
          <form className="signup-form">
            <label className="signUp" htmlFor="email">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name*"
              id="MobileNo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="signUp" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email*"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="dropdown">Location:</label>
            <select
              id="dropdown"
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="Northern Region">Northern Region</option>
              <option value="Eastern Region">Eastern Region</option>
              <option value="Western Region">Western Region</option>
              <option value="South Western Region">South Western Region</option>
              <option value="West Nile">West Nile</option>
              <option value="Central Region">Central Region</option>
            </select>

            <label htmlFor="password" className="signUp">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password*"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password" className="signUp">
              Retype Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password*"
              id="passwordConfirm"
              name="Confirmpassword"
              value={formData.Confirmpassword}
              onChange={handleChange}
              required
            />
            <div className="center">
              <div
                className="button login-button"
                onClick={handleSubmit}
                type="submit"
              >
                SignUp
              </div>
            </div>
            <div className="center">
              <div className="new-account">Already have an account? </div>
            </div>
            <div className="center">
              <div className="forgotPass create-acc" onClick={handleLogin}>
                LogIn
              </div>
            </div>
          </form>
        </ModalContent>
      </CustomModal>
    </div>
  );
}
