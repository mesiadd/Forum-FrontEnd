import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../../src/Image/bg-svg-f.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ResetByNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((state) => !state);
  };

  const resetToken = new URLSearchParams(window.location.search).get("token");

  console.log(resetToken);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      // Display an error message to the user
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reset/pass",
        {
          resetToken,
          newPassword,
        }
      );

      if (response.data.message === "Password reset successful") {
        setResetSuccess(true);
      } else {
        // Display an error message to the user
        alert("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Display an error message to the user
      alert("An error occurred");
    }
  };

  return (
    <Container>
      <Wrap>
        <ResetByNew>
          {resetSuccess ? (
            <p>
              Password reset successful! You can now log in with your new
              password.
            </p>
          ) : (
            <div>
              <h2>Reset Password</h2>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <EyeIcon onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </EyeIcon>
              <br />
              <br />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <EyeIcon onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </EyeIcon>
              <br />
              <br />
              <button onClick={handleResetPassword}>Reset Password</button>
              <br />
              <br />
              <Link to="/login">Already have an account?</Link>
              <br />
              <br />
              <Link to="/signup">Don't have an account?</Link>
            </div>
          )}
        </ResetByNew>
        <DescriptionStyle>
          <small>About</small>
          <h1>Evangadi Networks Q & A</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <button>How it Works</button>
        </DescriptionStyle>
      </Wrap>
    </Container>
  );
};

export default ResetByNewPassword;

const Container = styled.section`
  background-image: url(${backgroundImage});
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  z-index: -1;

  @media (max-width: 768px) {
    background-image: url(${backgroundImage});
    padding-top: 400px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 50px;

  margin-left: 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    padding-top: 170px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

const ResetByNew = styled.div`
  padding-top: 60px;
  padding-bottom: 150px;
  padding-left: 40px;
  padding-right: 20px;
  text-align: left;
  width: 500px;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  p {
    font-family: "Roboto", sans-serif !important;
    &:hover {
      color: #4a90e2;
    }
  }
  input {
    width: 90%;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    padding-left: 15px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  button {
    width: 94%;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #ffffff;
    background: #516cf0;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    &:hover {
      background-color: #fe8402;
    }
  }

  a {
    cursor: pointer;
    color: #ffb953;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    width: 400px;
    margin-right: 40px;
    margin-left: 0px;
    margin-bottom: 20px;
  }
`;

const DescriptionStyle = styled.div`
  width: 500px;
  margin-left: 10px;
  font-size: 14px;
  text-align: justify;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);

  small {
    color: #fe8402;
  }

  button {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #ffffff;
    background: #fe8402;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-bottom: 730px;
    padding-top: 20px;
    width: 450px;
    margin-left: 0px;
    margin-right: 40px;
  }
`;

const EyeIcon = styled.small`
  cursor: pointer;
  position: relative;
  right: 30px;
  vertical-align: middle;
  /* top: 50%;
  transform: translateY(-50%); */
  margin-left: -12px;
  color: rgba(0, 0, 0, 0.4);
  &:hover {
    color: #ffb953;
  }
`;
